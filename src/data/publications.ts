// Edit this file to add, remove, or update publications — the Publications
// section on the site reads directly from the PUBLICATIONS array below.
//
// To add a paper: copy the object shape below into the array.
//   title:   full paper title
//   authors: e.g. "Nagarjun Gowda K N" or "Nagarjun Gowda K N, Jane Doe"
//   venue:   where it's published/submitted, e.g. "arXiv preprint" or "IEEE ICC 2027"
//   status:  'Published' | 'Accepted' | 'Under Review' | 'Submitted' | 'Preprint'
//   year:    e.g. "2026"
//   summary: one or two sentence description (optional)
//   url:     link to the paper (e.g. a Google Drive share link). Leave
//            undefined/omit it until the link is ready — the title will
//            render as plain text with a "Link coming soon" note instead
//            of a dead link.
//
// Example entry (delete the leading // on each line and fill in your own):
// {
//   title: 'Paper Title Goes Here',
//   authors: 'Nagarjun Gowda K N',
//   venue: 'arXiv preprint',
//   status: 'Under Review',
//   year: '2026',
//   summary: 'One or two sentences describing what the paper is about.',
//   url: 'https://drive.google.com/file/d/YOUR_FILE_ID/view',
// },

export type PublicationStatus = 'Published' | 'Accepted' | 'Under Review' | 'Submitted' | 'Preprint';

export interface Publication {
  title: string;
  authors: string;
  venue?: string;
  status: PublicationStatus;
  year: string;
  summary?: string;
  url?: string;
}

export const PUBLICATIONS: Publication[] = [
  {
    title:
      'AI-NIDPS: A Deployment-Oriented Flow-Centric Architecture for Real-Time Explainable Network Intrusion Detection',
    authors: 'Nagarjun Gowda K N, Dhanalakshmi B K',
    venue: '2nd Int. Conf. Computing for Sustainability and Intelligent Future (COMP-SIF), IEEE Xplore',
    status: 'Published',
    year: '2026',
    url: 'https://drive.google.com/file/d/11MfI-jQ5oRAMwZd2ja010L3kqB-zll5R/view?usp=sharing',
  },
  {
    title: 'Energy-Aware Adaptive Inference for Computationally Efficient Deep Learning',
    authors: 'Nagarjun Gowda K N, Dhanalakshmi B K',
    venue: '2nd Int. Conf. Next Generation Electronics (NEleX), IEEE Xplore',
    status: 'Published',
    year: '2026',
    url: 'https://drive.google.com/file/d/1JbNV6qpNEG6CB0o-NpY4VSvYrWfQ2BU3/view?usp=sharing',
  },
  {
    title: 'Scale-Invariant Sharpness Measures and Their Impact on Generalization in Deep Neural Networks',
    authors: 'Nagarjun Gowda K N, Jayaraj U B, Muthukumaran L',
    venue: 'IEEE I4C 2026 (presented)',
    status: 'Accepted',
    year: '2026',
    url: 'https://drive.google.com/file/d/1j2OEY8RzSiDe6zvgUwpUkaV7TEdvvDzx/view?usp=sharing',
  },
  {
    title:
      'AgentShield: A Cooperative Multi-Agent Reinforcement Learning Framework for Autonomous Detection and Response to Novel Network Intrusions',
    authors: 'Nagarjun Gowda K N, Dhanalakshmi B K, Anusha K L',
    venue: 'IEEE International Flagship Conference, NKCon-2K26',
    status: 'Accepted',
    year: '2026',
    url: 'https://drive.google.com/file/d/1dRZEEGxu5JasvM3Ywwg1KsZ_Db61LK8L/view?usp=sharing',
  },
  {
    title:
      'Clinical and Linguistic Metrics Converge on Distinct Timescales: A Lightweight Dual-Adapter Framework for Chest X-Ray Report Generation',
    authors: 'Nagarjun Gowda K N, Ashwini N',
    venue: 'IEEE International Flagship Conference, NKCon-2K26',
    status: 'Accepted',
    year: '2026',
    url: 'https://drive.google.com/file/d/1Pdt0ZfYXnVMDf8kE7jsr2gzchhlgL-_J/view?usp=sharing',
  },
  {
    title:
      'Topology-Aware Explainability with Conformal Uncertainty Quantification for Real-Time Payment Fraud Detection: A Graph-Augmented Streaming Framework',
    authors: 'Nagarjun Gowda K N, Dhanalakshmi B K',
    venue: 'Expert Systems with Applications (Elsevier), final stage',
    status: 'Under Review',
    year: '2026',
    url: 'https://drive.google.com/file/d/1OdMkNS5J4E1M-3Pjn9CBHifU1iPmuks3/view?usp=sharing',
  },
  {
    title:
      'Coverage-Degradation Bounds for Conformal Prediction Under Energy-Aware Classifier Switching: A Case Study on Network Intrusion Detection Benchmarks',
    authors: 'Nagarjun Gowda K N, Ashwini N',
    venue: 'IEEE Access',
    status: 'Under Review',
    year: '2026',
    url: 'https://drive.google.com/file/d/10i3hQAc_XXSbFwsbXZNq0dIuMm1qqb_k/view?usp=sharing',
  },
  {
    title:
      'CausalStress: Counterfactual Stress Testing and Causal-Consistency Evaluation for Multivariate Time-Series Forecasters',
    authors: 'Nagarjun Gowda K N, Yashwanth K R',
    venue: '4th Int. Conf. Data Science and Information System (ICDSIS-2027)',
    status: 'Under Review',
    year: '2026',
    url: 'https://drive.google.com/file/d/1Js34U5Pc3ou1AQbaWMjBI0JbFESxcXjx/view?usp=sharing',
  },
];
