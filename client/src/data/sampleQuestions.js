export const sampleQuestions = [
  {
    question: "Which hook is used to perform side effects in a React function component?",
    options: ["useState", "useEffect", "useContext", "useReducer"],
    correctAnswer: "useEffect",
    correctExplanation:
      "useEffect runs side effects after render—such as fetching data, subscribing to events, or updating the DOM. It replaces lifecycle methods like componentDidMount in class components.",
    incorrectExplanations: {
      useState: "useState manages local state; it does not run side effects after render.",
      useContext: "useContext reads values from a React context; it does not handle side effects.",
      useReducer: "useReducer is for complex state logic via a reducer, not for general side effects.",
    },
  },
  {
    question: "What does JSX compile to under the hood?",
    options: [
      "HTML strings only",
      "React.createElement calls",
      "Direct DOM manipulation",
      "Web Components",
    ],
    correctAnswer: "React.createElement calls",
    correctExplanation:
      "JSX is syntactic sugar. Babel transforms JSX into React.createElement(type, props, ...children), which React uses to build the virtual DOM.",
    incorrectExplanations: {
      "HTML strings only":
        "React does not turn JSX into raw HTML strings for rendering logic; it creates element objects.",
      "Direct DOM manipulation":
        "React avoids direct DOM updates in application code; the reconciler updates the DOM from the virtual tree.",
      "Web Components": "JSX is not compiled to custom elements unless you explicitly use them.",
    },
  },
  {
    question: "In HTTP, which status code typically indicates a successful GET request?",
    options: ["201 Created", "204 No Content", "200 OK", "302 Found"],
    correctAnswer: "200 OK",
    correctExplanation:
      "200 OK means the request succeeded and the response body usually contains the requested resource—standard for successful GET requests.",
    incorrectExplanations: {
      "201 Created":
        "201 is used when a new resource is created, commonly after POST, not a typical GET success.",
      "204 No Content":
        "204 means success with no body; GET responses usually include content, so 200 is more typical.",
      "302 Found": "302 is a redirect, not a direct successful retrieval of the resource.",
    },
  },
];
