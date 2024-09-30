
import React, { useState } from 'react';
import MetricCards from "../Resources"
import CheckIcon from '@mui/icons-material/Check';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

const WAFRAssessment = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({
    question1: [],
    question2: [],
  });

  const questions = [
    'How do you securely operate your workload?',
    'How do you manage identities for people and machines?',
    'How do you detect and investigate security events?',
  ];

  const answers = {
    question1: [
      'Separate workloads using accounts',
      'Secure AWS account',
      'Identify and validate control objectives',
      'Keep up to date with security threats',
      'None of these',
    ],
    question2: [
      'Use strong sign-in mechanisms',
      'Secure AWS account',
    ],
    question3: [
      'Use strong sign-in mechanisms',
      'Secure AWS account',
    ],
  };

  const handleCheckboxChange = (question, answer) => {
    setSelectedAnswers(prevState => {
      const currentAnswers = prevState[question] || [];
      if (currentAnswers.includes(answer)) {
        // Remove the answer if it's already selected
        return { ...prevState, [question]: currentAnswers.filter(a => a !== answer) };
      } else {
        // Add the answer to the selected ones
        return { ...prevState, [question]: [...currentAnswers, answer] };
      }
    });
  };

  return (
    <div className="p-8 w-full">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-2xl font-semibold">45sdf28d - WAFR Assessment</h1>

        <div className="flex space-x-4">
          <button className="text-[#384CFF] border border-[#384CFF] px-4 py-2 rounded shadow">Last Scanned on 12 Aug 2024, 3:12PM</button>
          <button className="bg-[#384CFF] text-white px-4 py-2 rounded shadow">
            Submit Report
          </button>
          <button className="text-[#A699E3]">Exit Assessment</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className='my-4 w-full'>
        <MetricCards />
      </div>


      {/* Main Section: Questions and Answers */}
      {/* <div className="grid grid-cols-12 gap-4 w-full"> */}
      <div className="flex  gap-4 w-full">
        {/* Left Side: Question List */}
        <div className="col-span-4 bg-gray-50 p-4 rounded shadow h-[600px] overflow-y-auto w-full">
          <ul className="space-y-4">
            {questions.map((question, index) => (
              <li key={index} className="flex items-start space-x-4">
                <span className="flex items-center justify-center text-white bg-green-400 rounded-full w-5 h-5">
                <CheckIcon style={{ fontSize: '16px', fontWeight:700 }} />
                </span>
                <span>{index + 1}. {question}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Answer Options */}
        <div className="col-span-8 bg-white p-4 rounded shadow self-start h-[600px] overflow-y-auto w-full">
          {questions.map((question, index) => (
            <div key={index} className="mb-6">
              <h2 className="text-lg font-semibold mb-2">{index + 1}. {question}</h2>
              {answers[`question${index + 1}`].map((answer, i) => (
                <div key={i} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-blue-600"
                    checked={selectedAnswers[`question${index + 1}`]?.includes(answer)}
                    onChange={() => handleCheckboxChange(`question${index + 1}`, answer)}
                  />
                  <label className="text-gray-700">{answer}</label>
                </div>
              ))}
              {/* Add Note Section */}
              <button className="text-white bg-[#384CFF] px-2 py-1 flex items-center gap-2 rounded-md text-sm mt-4 "><DriveFileRenameOutlineOutlinedIcon style={{ fontSize: '16px', fontWeight:500 }} /> Add Note</button>
              <div className="text-xs text-[#023AFF] mt-1">RECOMMENDATION: </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WAFRAssessment;
