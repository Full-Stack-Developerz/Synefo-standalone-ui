
import React, { Component } from 'react';
import UploadIcon from '../../../../assets/img/wafr/Upload-icon.png'
import { Link } from 'react-router-dom';
import { APP_PREFIX_PATH } from 'Configs/AppConfig';

class WorkloadSummary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedFiles: [], // Initial state for uploaded files
    };
  }

  handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    this.setState((prevState) => ({
      uploadedFiles: [...prevState.uploadedFiles, ...files], 
    }));
  };

  render() {
    const { uploadedFiles } = this.state; 
    return (
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">45sdf28d</h1>
          <div className="flex space-x-4">
            <button className="text-[#384CFF] border border-[#384CFF] px-4 py-2 rounded shadow">Last Scanned on 12 Aug 2024, 3:12PM</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-8 border-b-2 border-gray-200 w-96">
          <button className="border-b-4 border-[#384CFF] py-2 text-[#384CFF] font-semibold">
            Workload Summary
          </button>
          <button className="py-2 text-gray-600">Attached Resources</button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Assessment Summary</h2>
            <Link to={`${APP_PREFIX_PATH}/wafr/assignment`}>
              <button className="bg-[#384CFF] text-white px-4 py-2 rounded shadow">
               Start Assessment
              </button>
            </Link>
          </div>

          {/* Table for Assessment Summary */}
          <table className="w-full table-auto text-start">
            <thead>
              <tr className="border-b text-start">
                <th className="px-4 py-2 text-start">Unanswered</th>
                <th className="px-4 py-2 text-start">Low</th>
                <th className="px-4 py-2 text-start">Medium</th>
                <th className="px-4 py-2 text-start">High</th>
                <th className="px-4 py-2 text-start">None</th>
                <th className="px-4 py-2 text-start">Not applicable</th>
                <th className="px-4 py-2 text-start">Assessment Completed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 text-gray-600">52</td>
                <td className="px-4 py-2 text-gray-600">--</td>
                <td className="px-4 py-2 text-gray-600">--</td>
                <td className="px-4 py-2 text-gray-600">--</td>
                <td className="px-4 py-2 text-gray-600">--</td>
                <td className="px-4 py-2 text-gray-600">--</td>
                <td className="px-4 py-2 text-green-600 font-semibold">0.00%</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-4 ">Workload Attachments</h2>
          <div className="border-2 flex flex-col w-96 self-center items-center justify-center border-dashed border-gray-300 p-10 rounded-lg">
            <img src={UploadIcon} alt='upload icon' />
            <p className="mt-4 text-center text-black text-lg">Drag & drop files to Upload</p>
          </div>
          <label className="bg-[#384CFF] text-white px-4 py-2 rounded shadow cursor-pointer self-center mt-4">
            Upload a file
            <input
              type="file"
              className="hidden"
              multiple
              onChange={this.handleFileUpload}
            />
          </label>
          <div className="mt-4 text-left">
            {uploadedFiles.length > 0 && (
              <ul>
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="text-gray-600">{file.name}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Well-Architected Framework Summary Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Well-Architected Framework Summary</h2>
          <table className="w-full text-start">
            <thead>
              <tr>
                {['Security Issues', 'Cost Issues', 'Reliability Issues', 'Operations Issues', 'Performance Issues'].map((issue, index) => (
                  <th key={index} className="px-4 py-2 text-lg text-start font-medium">
                    {issue}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {['08', '24', '12', '04', '12'].map((value, index) => (
                  <td key={index} className="px-4 py-2 text-xl text-green-600">
                    {value}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default WorkloadSummary;
