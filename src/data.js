const data = [
  {
    id: 1,
    question: "What does LDA stand for in machine learning?",
    answers: [
      { text: "Linear Discriminant Analysis", correct: true },
      { text: "Logistic Discriminant Algorithm", correct: false },
      { text: "Latent Dirichlet Allocation", correct: false },
      { text: "Linear Decision Analysis", correct: false },
    ],
  },
  {
    id: 2,
    question: "LDA is primarily used for which of the following purposes?",
    answers: [
      { text: "Clustering", correct: false },
      { text: "Regression", correct: false },
      { text: "Dimensionality reduction and classification", correct: true },
      { text: "Anomaly detection", correct: false },
    ],
  },
  {
    id: 3,
    question: "Unlike PCA, LDA is a _____ learning technique.",
    answers: [
      { text: "Unsupervised", correct: false },
      { text: "Supervised", correct: true },
      { text: "Semi-supervised", correct: false },
      { text: "Reinforcement", correct: false },
    ],
  },
  {
    id: 4,
    question: "What is the main goal of LDA in dimensionality reduction?",
    answers: [
      { text: "Maximize variance between classes while minimizing within-class variance", correct: true },
      { text: "Minimize total variance", correct: false },
      { text: "Maximize correlations between features", correct: false },
      { text: "Reduce features without considering classes", correct: false },
    ],
  },
  {
    id: 5,
    question: "Which assumptions does LDA make about the data? (Select all that apply)",
    answers: [
      { text: "Data is normally distributed", correct: true },
      { text: "Classes have identical covariance matrices", correct: true },
      { text: "Features are independent", correct: false },
      { text: "Data is linearly separable", correct: false },
    ],
  },
  {
    id: 6,
    question: "In LDA, the number of discriminant dimensions is at most _____ where C is the number of classes.",
    answers: [
      { text: "C", correct: false },
      { text: "C-1", correct: true },
      { text: "C+1", correct: false },
      { text: "2C", correct: false },
    ],
  },
  {
    id: 7,
    question: "What matrices are used in LDA to compute the projection?",
    answers: [
      { text: "Between-class scatter and within-class scatter matrices", correct: true },
      { text: "Covariance and correlation matrices", correct: false },
      { text: "Adjacency and Laplacian matrices", correct: false },
      { text: "Hessian and Jacobian matrices", correct: false },
    ],
  },
  {
    id: 8,
    question: "LDA can be seen as a generalization of which statistical test?",
    answers: [
      { text: "ANOVA", correct: true },
      { text: "Chi-square test", correct: false },
      { text: "T-test", correct: false },
      { text: "F-test", correct: false },
    ],
  },
  {
    id: 9,
    question: "In the context of LDA, what does the Fisher criterion maximize?",
    answers: [
      { text: "The ratio of between-class variance to within-class variance", correct: true },
      { text: "The sum of variances", correct: false },
      { text: "The product of class means", correct: false },
      { text: "The entropy of classes", correct: false },
    ],
  },
  {
    id: 10,
    question: "Which of the following is a limitation of LDA?",
    answers: [
      { text: "It assumes multivariate normality", correct: true },
      { text: "It can only handle binary classification", correct: false },
      { text: "It increases dimensionality", correct: false },
      { text: "It ignores class labels", correct: false },
    ],
  },
  {
    id: 11,
    question: "How does LDA handle multiclass problems compared to QDA?",
    answers: [
      { text: "LDA assumes equal covariance matrices across classes, while QDA allows different ones", correct: true },
      { text: "LDA allows different covariances, QDA assumes equal", correct: false },
      { text: "Both assume equal covariances", correct: false },
      { text: "Neither considers covariances", correct: false },
    ],
  },
  {
    id: 12,
    question: "In LDA, the decision boundary is _____ for binary classification.",
    answers: [
      { text: "Linear", correct: true },
      { text: "Quadratic", correct: false },
      { text: "Cubic", correct: false },
      { text: "Exponential", correct: false },
    ],
  },
  {
    id: 13,
    question: "What is the mathematical objective in LDA to find the projection vector w?",
    answers: [
      { text: "Maximize w^T S_B w / w^T S_W w", correct: true },
      { text: "Minimize w^T S_B w + w^T S_W w", correct: false },
      { text: "Maximize w^T S_W w / w^T S_B w", correct: false },
      { text: "Solve w^T S_B w = lambda w^T S_W w", correct: false },
    ],
  },
  {
    id: 14,
    question: "In which scenario might LDA outperform PCA for classification tasks?",
    answers: [
      { text: "When class separability is more important than variance preservation", correct: true },
      { text: "When data is unlabeled", correct: false },
      { text: "When features are highly correlated", correct: false },
      { text: "When the number of classes exceeds dimensions", correct: false },
    ],
  },
  {
    id: 15,
    question: "For a dataset with C classes and p features, when is the within-class scatter matrix S_W singular, requiring regularization in LDA?",
    answers: [
      { text: "When the total number of samples N < p + C", correct: true },
      { text: "When N > p", correct: false },
      { text: "When C = 2", correct: false },
      { text: "When features are normalized", correct: false },
    ],
  },
];

const prizeMoney = [
  { id: 1, amount: "₹ 5000" },
  { id: 2, amount: "₹ 15000" },
  { id: 3, amount: "₹ 30000" },
  { id: 4, amount: "₹ 60000" },
  { id: 5, amount: "₹ 100000" },
  { id: 6, amount: "₹ 150000" },
  { id: 7, amount: "₹ 250000" },
  { id: 8, amount: "₹ 400000" },
  { id: 9, amount: "₹ 600000" },
  { id: 10, amount: "₹ 1000000" },
  { id: 11, amount: "₹ 5000000" },
  { id: 12, amount: "₹ 100000000" },
  { id: 13, amount: "₹ 300000000" },
  { id: 14, amount: "₹ 500000000" },
  { id: 15, amount: "₹ 1000000000" },
].reverse();

export { prizeMoney, data };