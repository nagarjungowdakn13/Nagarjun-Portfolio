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
      'Entity-Grounded Explanations, Conformal Triage and Drift Detection for Streaming Payment Fraud',
    authors: 'Nagarjun Gowda K N, Dhanalakshmi B K',
    venue: 'Expert Systems with Applications (Elsevier)',
    status: 'Under Review',
    year: '2026',
    url: 'https://drive.google.com/file/d/1OdMkNS5J4E1M-3Pjn9CBHifU1iPmuks3/view?usp=sharing',
  },
  {
    title:
      'Conformal Coverage Under Cost-Saving Classifier Switching in Network Intrusion Detection',
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
  {
    title: 'Risk-Controlled Fidelity Allocation for Energy-Aware Network Intrusion Detection',
    authors: 'Nagarjun Gowda K N, Nakul B, Jayanth Gopala V',
    venue: '3rd Int. Conf. Computing for Sustainability and Intelligent Future (COMP-SIF 2027)',
    status: 'Submitted',
    year: '2026',
    summary:
      'Learn-then-Test-certified three-tier detection cut CPU by 47% on UNSW-NB15 at near-identical recall and 61% on CSE-CIC-IDS2018; 60-second block calibration reduced burst-campaign guarantee violations to ≤2%.',
  },
  {
    title: 'CyberShieldNet: When Does Learned Multimodal Fusion Pay Off for Cyber-Risk Prioritization?',
    authors: 'Nagarjun Gowda K N',
    venue: '3rd Int. Conf. Computing for Sustainability and Intelligent Future (COMP-SIF 2027)',
    status: 'Submitted',
    year: '2026',
    summary:
      'On 58 days of LANL logs, unconstrained learned fusion collapsed to Recall@50 0.032, while sign-constrained learning gave the best fused Recall@50 (0.374) and stayed stable across regularization strengths.',
  },
  {
    title: 'Quantum-Enhanced Graph Learning for Zero-Day Attack Detection under Distribution Shift',
    authors: 'Nagarjun Gowda K N, Nakul B, Jayanth Gopala V',
    venue: 'NQComp 2027',
    status: 'Submitted',
    year: '2026',
    summary:
      'Negative result: the quantum head underperformed an MLP head on held-out attack families (PR-AUC 0.897 vs. 0.934); host overlap inflated graph results, and gate noise cut fixed-threshold recall from 0.695 to 0.415.',
  },
];
