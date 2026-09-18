(function () {
  "use strict";

  var MESSAGE_TYPE = "g10:practice-test-result";
  var ACK_TYPE = "g10:practice-test-result:ack";
  var lastFingerprint = "";
  var pendingAttemptId = "";
  var bridgeStartedAt = Date.now();

  function parentOrigin() {
    if (window.parent === window || !document.referrer) return "";
    try {
      var url = new URL(document.referrer);
      var host = url.hostname.toLowerCase();
      var allowed = host === "learn.g10educationalplatformindia.co.in"
        || host === "localhost"
        || host === "127.0.0.1"
        || (host.endsWith(".vercel.app") && host.indexOf("g10-educational-platform") !== -1);
      return allowed ? url.origin : "";
    } catch (_) {
      return "";
    }
  }

  function numeric(value, fallback) {
    var number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function integer(value, fallback) {
    return Math.max(0, Math.round(numeric(value, fallback)));
  }

  function text(value) {
    if (Array.isArray(value)) return value.join(", ").slice(0, 1000);
    return String(value == null ? "" : value).trim().slice(0, 1000);
  }

  function status(value, selected) {
    var raw = String(value || "").toLowerCase();
    var answer = String(selected || "").toLowerCase();
    if (/not\s*(attempted|answered)|unanswered|skipped/.test(raw)
      || !answer
      || /not\s*answered|^-$/.test(answer)) return "unanswered";
    if (/wrong|incorrect/.test(raw)) return "incorrect";
    if (/correct/.test(raw)) return "correct";
    return "incorrect";
  }

  function timerSeconds() {
    var countdown = document.getElementById("timerTitle");
    var timer = countdown || document.getElementById("timer");
    var match = String(timer && timer.textContent || "").match(/(\d{1,2}):(\d{2})(?::(\d{2}))?/);
    if (!match) return Math.max(0, Math.round((Date.now() - bridgeStartedAt) / 1000));
    var displayed = match[3]
      ? integer(match[1], 0) * 3600 + integer(match[2], 0) * 60 + integer(match[3], 0)
      : integer(match[1], 0) * 60 + integer(match[2], 0);
    if (countdown) {
      try {
        if (typeof config !== "undefined" && numeric(config.testTime, 0) > 0) {
          return Math.max(0, Math.round(numeric(config.testTime, 0) * 60 - displayed));
        }
      } catch (_) {
        return Math.max(0, Math.round((Date.now() - bridgeStartedAt) / 1000));
      }
    }
    return displayed;
  }

  function labeledNumber(source, label) {
    var escaped = label.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var match = String(source || "").match(new RegExp(escaped + "\\s*:\\s*(-?\\d+(?:\\.\\d+)?)", "i"));
    return match ? numeric(match[1], NaN) : NaN;
  }

  function scoreFraction(source) {
    var match = String(source || "").match(/\b(?:final\s+)?score\s*:?\s*(-?\d+(?:\.\d+)?)\s*(?:\/|out\s+of)\s*(\d+(?:\.\d+)?)/i);
    if (!match) return null;
    var score = numeric(match[1], NaN);
    var maximum = numeric(match[2], NaN);
    return Number.isFinite(score) && maximum > 0 ? { score: score, maximum: maximum } : null;
  }

  function makeAttemptId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") return window.crypto.randomUUID();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (character) {
      var random = Math.random() * 16 | 0;
      var value = character === "x" ? random : (random & 3 | 8);
      return value.toString(16);
    });
  }

  function modernResult() {
    if (typeof window.computeResult !== "function") return null;
    var result;
    try {
      result = window.computeResult();
    } catch (_) {
      return null;
    }
    if (!result || typeof result !== "object") return null;

    var total = integer(result.total, 0);
    if (!total) return null;
    var marksPerCorrect = 4;
    try {
      if (typeof config !== "undefined" && numeric(config.marksPerCorrect, 0) > 0) {
        marksPerCorrect = numeric(config.marksPerCorrect, 4);
      }
    } catch (_) {
      marksPerCorrect = 4;
    }
    var resultText = document.getElementById("resultArea");
    var displayedMaximum = labeledNumber(resultText && resultText.textContent, "Total Marks");
    var maximum = displayedMaximum > 0 ? displayedMaximum : total * marksPerCorrect;
    var answers = Array.isArray(result.rows) ? result.rows.slice(0, 2000).map(function (row) {
      var selected = text(row && (row.sel != null ? row.sel : row.selected));
      return {
        question: text(row && (row.q != null ? row.q : row.question)).slice(0, 100),
        selected: selected,
        correct: text(row && (row.key != null ? row.key : row.correct)),
        status: status(row && row.status, selected)
      };
    }) : [];

    return {
      score: numeric(result.score, 0),
      maxScore: maximum,
      totalQuestions: total,
      correct: integer(result.correct, 0),
      incorrect: integer(result.wrong != null ? result.wrong : result.incorrect, 0),
      unanswered: integer(result.na != null ? result.na : result.unanswered, 0),
      timeSpentSeconds: Math.min(86400, timerSeconds()),
      answers: answers
    };
  }

  function legacyResult() {
    var scorecard = document.getElementById("scorecard");
    var details = document.getElementById("scoreDetails");
    if (!scorecard || !details || !details.querySelectorAll("tr").length) return null;
    var source = scorecard.textContent || "";
    var maximum = labeledNumber(source, "Total Marks (Possible)");
    var finalScore = labeledNumber(source, "Final Score");
    if (!(maximum > 0) || !Number.isFinite(finalScore)) return null;

    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var answers = Array.prototype.slice.call(details.querySelectorAll("tr"), 0, 2000).map(function (row, index) {
      var cells = Array.prototype.map.call(row.cells || [], function (cell) {
        return String(cell.textContent || "").trim();
      });
      var selected = cells[2] || "";
      var state = status(cells[4] || "", selected);
      if (state === "correct") correct += 1;
      else if (state === "unanswered") unanswered += 1;
      else incorrect += 1;
      return {
        question: text(cells[0] || index + 1).slice(0, 100),
        selected: text(selected),
        correct: text(cells[3] || ""),
        status: state
      };
    });

    return {
      score: finalScore,
      maxScore: maximum,
      totalQuestions: answers.length,
      correct: correct,
      incorrect: incorrect,
      unanswered: unanswered,
      timeSpentSeconds: Math.min(86400, timerSeconds()),
      answers: answers
    };
  }

  function scoredQuizResult() {
    var scoreCard = document.getElementById("scoreCard");
    if (!scoreCard || !/\bscore\s*:/i.test(scoreCard.textContent || "")) return null;

    try {
      if (typeof quizData === "undefined" || !Array.isArray(quizData) || !quizData.length
        || typeof scores === "undefined" || !scores || typeof scores !== "object") return null;

      var correct = 0;
      var incorrect = 0;
      var unanswered = 0;
      var answers = quizData.slice(0, 2000).map(function (question, index) {
        var questionNumber = index + 1;
        var selectedInput = document.querySelector("input[name='q" + questionNumber + "']:checked");
        var selected = text(selectedInput && selectedInput.value);
        var correctAnswer = text(question && question.correctOption);
        var answerStatus;

        if (!selected) {
          unanswered += 1;
          answerStatus = "unanswered";
        } else if (selected.toUpperCase() === correctAnswer.toUpperCase()) {
          correct += 1;
          answerStatus = "correct";
        } else {
          incorrect += 1;
          answerStatus = "incorrect";
        }

        return {
          question: text(question && question.question || questionNumber).slice(0, 100),
          selected: selected,
          correct: correctAnswer,
          status: answerStatus
        };
      });

      var score = Object.keys(scores).reduce(function (total, key) {
        return total + numeric(scores[key], 0);
      }, 0);
      var elapsed = 0;
      if (typeof quizStartTime !== "undefined" && quizStartTime) {
        elapsed = Math.max(0, Math.round((Date.now() - new Date(quizStartTime).getTime()) / 1000));
      }

      return {
        score: score,
        maxScore: quizData.length,
        totalQuestions: quizData.length,
        correct: correct,
        incorrect: incorrect,
        unanswered: unanswered,
        timeSpentSeconds: Math.min(86400, elapsed),
        answers: answers
      };
    } catch (_) {
      return null;
    }
  }

  function renderedScoreResult() {
    var candidates = Array.prototype.slice.call(document.querySelectorAll(
      "#scoreCard,#scorecard,.score-card,.scorecard,.score-section,[data-scorecard]"
    ));
    var card = null;
    var fraction = null;

    candidates.some(function (candidate) {
      var parsed = scoreFraction(candidate && candidate.textContent);
      if (!parsed) return false;
      card = candidate;
      fraction = parsed;
      return true;
    });
    if (!card || !fraction) return null;

    var grouped = {};
    Array.prototype.forEach.call(document.querySelectorAll("input[type='radio'][name]"), function (input) {
      var name = String(input.name || "");
      if (!name) return;
      if (!grouped[name]) grouped[name] = [];
      grouped[name].push(input);
    });

    var groupNames = Object.keys(grouped).slice(0, 2000);
    var totalQuestions = groupNames.length || integer(fraction.maximum, 0);
    if (!totalQuestions) return null;

    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var allAnswerKeysKnown = groupNames.length > 0;
    var answers = groupNames.map(function (name, index) {
      var radios = grouped[name];
      var selectedInput = null;
      radios.some(function (input) {
        if (!input.checked) return false;
        selectedInput = input;
        return true;
      });

      var block = radios[0] && radios[0].closest
        ? radios[0].closest(".question,.question-card,[data-question]")
        : null;
      var solution = block && block.querySelector
        ? block.querySelector(".solution,.answer,.explanation,.correct-answer,[data-correct-answer]")
        : null;
      var solutionText = String(solution && solution.textContent || "");
      var keyMatch = solutionText.match(/correct\s*(?:answer|option)?\s*[:\-]\s*(?:option\s*)?([A-Z]|\d+)\b/i);
      var correctAnswer = keyMatch ? text(keyMatch[1]).toUpperCase() : "";
      var selected = text(selectedInput && selectedInput.value).toUpperCase();
      var answerStatus = "unanswered";

      if (!correctAnswer) allAnswerKeysKnown = false;
      if (!selected) unanswered += 1;
      else if (correctAnswer && selected === correctAnswer) {
        correct += 1;
        answerStatus = "correct";
      } else {
        incorrect += 1;
        answerStatus = "incorrect";
      }

      var questionNode = block && block.querySelector
        ? block.querySelector(".question-text,[data-question-text],h3,h2")
        : null;
      return {
        question: text(questionNode && questionNode.textContent || name || index + 1).slice(0, 100),
        selected: selected,
        correct: correctAnswer,
        status: answerStatus
      };
    });

    var source = card.textContent || "";
    var displayedCorrect = labeledNumber(source, "Correct");
    var displayedIncorrect = labeledNumber(source, "Incorrect");
    if (!Number.isFinite(displayedIncorrect)) displayedIncorrect = labeledNumber(source, "Wrong");
    var displayedUnanswered = labeledNumber(source, "Not Answered");
    if (!Number.isFinite(displayedUnanswered)) displayedUnanswered = labeledNumber(source, "Unanswered");

    if (Number.isFinite(displayedCorrect) && Number.isFinite(displayedIncorrect) && Number.isFinite(displayedUnanswered)
      && displayedCorrect + displayedIncorrect + displayedUnanswered <= totalQuestions) {
      correct = integer(displayedCorrect, 0);
      incorrect = integer(displayedIncorrect, 0);
      unanswered = integer(displayedUnanswered, 0);
    } else if (!allAnswerKeysKnown) {
      unanswered = groupNames.reduce(function (count, name) {
        return count + (grouped[name].some(function (input) { return input.checked; }) ? 0 : 1);
      }, 0);
      var answered = Math.max(0, totalQuestions - unanswered);
      correct = Math.min(answered, integer(fraction.score, 0));
      incorrect = Math.max(0, answered - correct);
      answers = [];
    }

    return {
      score: fraction.score,
      maxScore: fraction.maximum,
      totalQuestions: totalQuestions,
      correct: correct,
      incorrect: incorrect,
      unanswered: unanswered,
      timeSpentSeconds: Math.min(86400, timerSeconds()),
      answers: answers.slice(0, 2000)
    };
  }

  function notice(message, kind) {
    var item = document.getElementById("g10-result-save-notice");
    if (!item) {
      item = document.createElement("div");
      item.id = "g10-result-save-notice";
      item.setAttribute("role", "status");
      item.style.cssText = "position:fixed;z-index:2147483647;right:14px;bottom:14px;max-width:320px;padding:10px 14px;border-radius:999px;box-shadow:0 8px 28px rgba(0,0,0,.24);font:700 13px/1.35 Arial,sans-serif;text-align:center";
      document.body.appendChild(item);
    }
    item.style.background = kind === "error" ? "#fff0f0" : kind === "saved" ? "#eafbf0" : "#eef6ff";
    item.style.color = kind === "error" ? "#9b2222" : kind === "saved" ? "#11633a" : "#075fae";
    item.textContent = message;
  }

  function send(result) {
    var origin = parentOrigin();
    if (!origin || !result) return;
    var fingerprint = [result.score, result.maxScore, result.correct, result.incorrect, result.unanswered].join("|");
    if (fingerprint === lastFingerprint) return;
    lastFingerprint = fingerprint;
    pendingAttemptId = makeAttemptId();
    notice("Saving result to your G10 progress report…", "saving");
    window.parent.postMessage({
      type: MESSAGE_TYPE,
      version: 1,
      clientAttemptId: pendingAttemptId,
      result: result
    }, origin);
  }

  function captureResult(silent) {
    var result = modernResult() || legacyResult() || scoredQuizResult() || renderedScoreResult();
    if (result) send(result);
    else if (!silent) notice("This result could not be read automatically. Please inform G10 support.", "error");
  }

  window.G10PracticeResults = {
    save: function (result) { send(result); },
    capture: function () { captureResult(false); }
  };

  document.addEventListener("click", function (event) {
    var target = event.target && event.target.closest ? event.target.closest("button,input[type='submit'],input[type='button']") : null;
    if (!target) return;
    var label = String(target.textContent || target.value || "").trim();
    var onclick = String(target.getAttribute("onclick") || "");
    var isFinalSubmit = target.id === "submitBtn"
      || /finalSubmit\s*\(/.test(onclick)
      || /showScore\s*\(/.test(onclick)
      || /^(final\s+submit|submit\s*&\s*score)$/i.test(label);
    if (isFinalSubmit) {
      window.setTimeout(function () { captureResult(true); }, 150);
      window.setTimeout(function () { captureResult(true); }, 600);
      window.setTimeout(function () { captureResult(false); }, 1500);
    }
  }, true);

  window.addEventListener("message", function (event) {
    if (event.origin !== parentOrigin() || !event.data || event.data.type !== ACK_TYPE) return;
    if (event.data.clientAttemptId !== pendingAttemptId) return;
    notice(event.data.ok ? "✓ Result saved to G10 progress" : "Result was not saved. Keep this page open and try again.", event.data.ok ? "saved" : "error");
  });
})();
