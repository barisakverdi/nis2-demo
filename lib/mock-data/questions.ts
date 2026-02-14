export interface QuestionOption {
  id: string;
  text: string;
  score: number; // 1-4 score for maturity level
}

export interface Question {
  id: string;
  category: string;
  topic: string;
  question: string;
  helptext: string;
  options: QuestionOption[];
  stepIndex: number; // Which step this question belongs to (0-2 for first 3 steps)
}

export const SURVEY_QUESTIONS: Question[] = [
  {
    id: 'q1',
    category: 'CIS v8.1',
    topic: '1. Inventory and Control of Enterprise Assets',
    question:
      "How are known/unknown assets that connect to the organization's infrastructure documented, and how are unauthorized assets handled?",
    helptext:
      'This involves authorized and non-authorized devices that connect to the network. For example, printers, IoT devices, Wi-Fi sharing devices, and personal devices, etc. CIS: 1.1 / 1.2 / 1.3 / 1.4 / 1.5',
    stepIndex: 0,
    options: [
      {
        id: 'q1-opt1',
        text: 'No inventory of known assets. No action is taken on unauthorized assets.',
        score: 1,
      },
      {
        id: 'q1-opt2',
        text: 'Organization owned assets are registered and maintained in a Central Configuration Management Database (CMDB) bi-annually, or more frequently. No action is taken on unauthorized assets.',
        score: 2,
      },
      {
        id: 'q1-opt3',
        text: 'All organization-owned asset information collection/update is automated and stored in the Central Configuration Management Database (CMDB) for all available sources (for example, mobile device manager and DHCP). Every week the process to check and either remove, deny or quarantine unauthorized assets is carried out.',
        score: 3,
      },
      {
        id: 'q1-opt4',
        text: "All organization-owned asset information collection/update is automated and stored in the Central Configuration Management Database (CMDB) from all available sources (for example, mobile device manager and DHCP). Unauthorized assets are detected and registered in the CMDB automatically and classified as untrusted until asset is classified differently through the asset registration process. A passive discovery tool is used to identify assets connected to the organization's network. The information from the passive scans is used to update the CMDB at least weekly, or more frequently.",
        score: 4,
      },
    ],
  },
  {
    id: 'q2',
    category: 'CIS v8.1',
    topic: '2. Inventory and Control of Software Assets',
    question: 'How are (software) applications identified and registered in your organization?',
    helptext:
      'How does your organization identify and keep track of the various software applications that are used within its operations. This includes both internally developed applications as well as third-party applications that are utilized by the organization. CIS 2.1 / 2.4',
    stepIndex: 1,
    options: [
      {
        id: 'q2-opt1',
        text: 'Applications are not being registered or managed.',
        score: 1,
      },
      {
        id: 'q2-opt2',
        text: 'A manual inventory process is in place to register applications. The software inventory is reviewed and updated bi-annually, or more frequently.',
        score: 2,
      },
      {
        id: 'q2-opt3',
        text: 'Application inventory is manual. All applications are registered manually in the CMDB, for each application the following information is documented: Title, publisher, initial install/use date, and business purpose. Where appropriate, include the URL, app store(s), version(s), deployment mechanism, and decommission date. The software inventory is reviewed and updated bi-annually, or more frequently.',
        score: 3,
      },
      {
        id: 'q2-opt4',
        text: 'Application inventory is automated. All applications are registered in the CMDB, for each application the following information is documented: Title, publisher, initial install/use date, and business purpose. Where appropriate, include the URL, app store(s), version(s), deployment mechanism, and decommission date. Application usage is monitored for both registered and unregistered (shadow-IT) software. Monthly reports on shadow-IT are provided to risk manager and/or security manager for further assessment.',
        score: 4,
      },
    ],
  },
  {
    id: 'q3',
    category: 'CIS v8.1',
    topic: '3. Data Protection',
    question: 'How is data management organized in your organization?',
    helptext:
      'A data management policy covers various processes related to how data is stored, handled, and moved, as well as issues like data ownership, sensitivity, retention, and disposal requirements. CIS 3.1 / 3.2 / 3.8',
    stepIndex: 2,
    options: [
      {
        id: 'q3-opt1',
        text: 'Our organization does not have a data management policy. It is unclear where sensitive data resides or how data is protected.',
        score: 1,
      },
      {
        id: 'q3-opt2',
        text: 'A data management policy is available. Data management processes are implemented.',
        score: 2,
      },
      {
        id: 'q3-opt3',
        text: 'A data management policy is available. Data management processes are implemented. Tooling is used to automatically inventory data. Compliance is reported to stakeholders manually. Data flows are not documented.',
        score: 3,
      },
      {
        id: 'q3-opt4',
        text: 'A data management policy is available, and data management processes are implemented. Data flows are documented based upon the data management process. Data compliance is monitored and automatically reported to stakeholders at least each quarter or the organization has established attack resilient data management.',
        score: 4,
      },
    ],
  },
];
