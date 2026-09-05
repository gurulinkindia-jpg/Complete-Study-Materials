# G10 practice-test HTML inventory

Last updated: 5 September 2026
Tracking-enabled HTML files: **104**

Every file below loads the shared `g10-practice-result-bridge.js` script. When a signed-in student submits one of these tests inside the G10 platform, the result is saved to the student's progress report.

## Summary

| Area | Tests |
| --- | ---: |
| Class 10 / Science | 10 |
| Class 11 / Chemistry | 12 |
| Class 11 / Physics | 4 |
| Class 12 / Chemistry | 18 |
| Class 9 / Science | 18 |
| IIT JEE / Chemistry | 42 |
| **Total** | **104** |

## Adding another HTML test

1. Copy the new `.html` test into the appropriate folder.
2. From this repository folder, run `./Enable-G10PracticeTracking.ps1` in PowerShell. It adds the tracking bridge only to HTML files that do not already contain it.
3. Commit and push the HTML file.
4. Add its GitHub Pages URL through **Admin → New practice test library**.
5. Open it through the G10 student course page and submit one test to verify that the green **Result saved** notice appears.

Use `./Enable-G10PracticeTracking.ps1 -Check` to list untracked HTML files without changing them.

The automatic bridge recognises the two test templates currently used in this repository. If a future test has a completely different result structure, call `window.G10PracticeResults.save(result)` from its final submit handler with this object:

```js
window.G10PracticeResults.save({
  score: 32,
  maxScore: 40,
  totalQuestions: 10,
  correct: 8,
  incorrect: 1,
  unanswered: 1,
  timeSpentSeconds: 720,
  answers: [
    { question: "1", selected: "B", correct: "B", status: "correct" }
  ]
});
```

## Complete file list

1. `Class 10/Science/Practice Test/Chapter 7/Easy/01_Reproduction_DNA_Copying_and_Variation.html`
2. `Class 10/Science/Practice Test/Chapter 7/Easy/02_Asexual_Reproduction_in_Unicellular_Organisms.html`
3. `Class 10/Science/Practice Test/Chapter 7/Easy/03_Asexual_Reproduction_in_Multicellular_Organisms.html`
4. `Class 10/Science/Practice Test/Chapter 7/Easy/04_Vegetative_Propagation_and_Tissue_Culture.html`
5. `Class 10/Science/Practice Test/Chapter 7/Easy/05_Sexual_Reproduction_and_Flower_Structure.html`
6. `Class 10/Science/Practice Test/Chapter 7/Easy/06_Pollination_Fertilisation_Seed_and_Germination.html`
7. `Class 10/Science/Practice Test/Chapter 7/Easy/07_Puberty_and_Human_Reproduction_Overview.html`
8. `Class 10/Science/Practice Test/Chapter 7/Easy/08_Male_Reproductive_System.html`
9. `Class 10/Science/Practice Test/Chapter 7/Easy/09_Female_System_Fertilisation_Pregnancy_and_Menstruation.html`
10. `Class 10/Science/Practice Test/Chapter 7/Easy/10_Reproductive_Health_STDs_and_Contraception.html`
11. `Class 11/Chemistry/Practice Test/Chapter 3/Easy/1. Classification_Periodicity.html`
12. `Class 11/Chemistry/Practice Test/Chapter 3/Easy/2. Mendeleev_Periodic_Table.html`
13. `Class 11/Chemistry/Practice Test/Chapter 3/Easy/3. Modern_Periodic_Law_Table.html`
14. `Class 11/Chemistry/Practice Test/Chapter 3/Easy/4. Electronic_Configuration_Position.html`
15. `Class 11/Chemistry/Practice Test/Chapter 3/Easy/5. Metals_Nonmetals_Metalloids.html`
16. `Class 11/Chemistry/Practice Test/Chapter 3/Easy/6. Periodic_Trends_Atomic_Properties.html`
17. `Class 11/Chemistry/Practice Test/Chapter 3/Easy/7. Periodicity_Chemical_Properties.html`
18. `Class 11/Chemistry/Practice Test/Chapter 3/Easy/8. Anomalous_Second_Period_Elements.html`
19. `Class 11/Chemistry/Practice Test/Chapter 3/Medium/CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES-1.html`
20. `Class 11/Chemistry/Practice Test/Chapter 3/Medium/CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES-2.html`
21. `Class 11/Chemistry/Practice Test/Chapter 3/Medium/CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES-3.html`
22. `Class 11/Chemistry/Practice Test/Chapter 3/Medium/CLASSIFICATION OF ELEMENTS AND PERIODICITY IN PROPERTIES-4.html`
23. `Class 11/Physics/Practice Test/Chapter 1/Easy/1.  Dimensions and Dimensional Analysis.html`
24. `Class 11/Physics/Practice Test/Chapter 1/Easy/2.  Units Conversion.html`
25. `Class 11/Physics/Practice Test/Chapter 1/Easy/3.  Fundamental and Derived Quantities.html`
26. `Class 11/Physics/Practice Test/Chapter 1/Easy/4.  Fundamental and Derived Units focusing on System of Units (CGS, MKS, FPS, SI).html`
27. `Class 12/Chemistry/Practice Test/Chapter 1/Easy/Basic easy question 2026.html`
28. `Class 12/Chemistry/Practice Test/Chapter 1/Medium/medum question july 2026 - protected.html`
29. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/01_Classification_and_Nomenclature.html`
30. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/02_Nature_of_CX_Bond_and_Preparation_from_Alcohols.html`
31. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/03_Free_Radical_Halogenation.html`
32. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/04_Preparation_from_Alkenes.html`
33. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/05_Halogen_Exchange_and_Diazonium_Routes.html`
34. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/06_Physical_Properties.html`
35. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/07_Nucleophilic_Substitution_Product_Map.html`
36. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/08_SN2_Mechanism.html`
37. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/09_SN1_and_Stereochemistry.html`
38. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/10_Elimination_Reactions.html`
39. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/11_Reactions_with_Metals.html`
40. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/12_Haloarenes_Nucleophilic_Substitution.html`
41. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/13_Electrophilic_Substitution_of_Haloarenes.html`
42. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/14_Friedel_Crafts_and_Coupling_of_Haloarenes.html`
43. `Class 12/Chemistry/Practice Test/Chapter 6/Easy/15_Polyhalogen_Compounds.html`
44. `Class 9/Science/Practice Test/Chapter 6/Easy/01_Concept_of_Force.html`
45. `Class 9/Science/Practice Test/Chapter 6/Easy/02_Balanced_and_Unbalanced_Forces.html`
46. `Class 9/Science/Practice Test/Chapter 6/Easy/03_Force_of_Friction.html`
47. `Class 9/Science/Practice Test/Chapter 6/Easy/04_Newtons_First_Law.html`
48. `Class 9/Science/Practice Test/Chapter 6/Easy/05_Newtons_Second_Law.html`
49. `Class 9/Science/Practice Test/Chapter 6/Easy/06_Newtons_Third_Law_and_Rocket_Propulsion.html`
50. `Class 9/Science/Practice Test/Chapter 6/Easy/07_Forces_Acting_on_a_System_of_Objects.html`
51. `Class 9/Science/Practice Test/Chapter 8/Easy/01_Matter_Atoms_and_Roots_of_Atomic_Theory.html`
52. `Class 9/Science/Practice Test/Chapter 8/Easy/02_Electron_Discovery_and_Thomsons_Model.html`
53. `Class 9/Science/Practice Test/Chapter 8/Easy/03_Gold_Foil_Experiment_and_Rutherfords_Model.html`
54. `Class 9/Science/Practice Test/Chapter 8/Easy/04_Proton_and_Bohrs_Model.html`
55. `Class 9/Science/Practice Test/Chapter 8/Easy/05_Neutron_and_Atomic_Mass.html`
56. `Class 9/Science/Practice Test/Chapter 8/Easy/06_Symbols_of_Elements.html`
57. `Class 9/Science/Practice Test/Chapter 8/Easy/07_Atomic_Number_Mass_Number_and_Notation.html`
58. `Class 9/Science/Practice Test/Chapter 8/Easy/08_Electron_Distribution_in_Shells.html`
59. `Class 9/Science/Practice Test/Chapter 8/Easy/09_Combining_Capacity_Valency.html`
60. `Class 9/Science/Practice Test/Chapter 8/Easy/10_Isotopes_Average_Atomic_Mass_and_Isobars.html`
61. `Class 9/Science/Practice Test/Chapter 8/Easy/11_Evolution_of_Atomic_Models.html`
62. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-1.html`
63. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-10.html`
64. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-11.html`
65. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-12.html`
66. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-2.html`
67. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-3.html`
68. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-4.html`
69. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-5.html`
70. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-6.html`
71. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-7.html`
72. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-8.html`
73. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/1.  General chrecterstice-9.html`
74. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-1.html`
75. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-10.html`
76. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-11.html`
77. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-12.html`
78. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-13.html`
79. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-14.html`
80. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-15.html`
81. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-16.html`
82. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-17.html`
83. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-18.html`
84. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-2.html`
85. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-3.html`
86. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-4.html`
87. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-5.html`
88. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-6.html`
89. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-7.html`
90. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-8.html`
91. `IIT JEE/Chemistry/Practice Test/Chapter 27/Medium/2. Compounds of Transitional elements-9.html`
92. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-1.html`
93. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-10.html`
94. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-11.html`
95. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-12.html`
96. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-2.html`
97. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-3.html`
98. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-4.html`
99. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-5.html`
100. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-6.html`
101. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-7.html`
102. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-8.html`
103. `IIT JEE/Chemistry/Practice Test/Chapter 4/Medium/1.  General chrecterstice-9.html`
104. `Class 12/Chemistry/Practice Test/Chapter 1/PYQ/CBSE_Chemistry_Solutions_PYQ_2024_2026_All_MCQ (1).html`
