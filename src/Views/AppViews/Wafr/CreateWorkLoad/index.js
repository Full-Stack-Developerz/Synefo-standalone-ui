
import React, { Component } from 'react';
import SelectComponent from '../SelectComponent';
import { ToastMessage } from "Toast/ToastMessage";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ToggleButton from '../components/ToggleButton';
import { createWorkload } from '../apis';
import { getRecentVisitedEnvironments } from 'Utils';

class CreateWorkloadForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workloadName: '',
            workloadOwner: '',
            isWorkloadResources: false,
            lens: '',
            awsAccount: '', 
            workloadType: '',
            environment: '',
            description: '',
            istoggle: false,
            tags: [{ key: '', value: '' }],
        };
    }

    componentDidMount() {
        const recentEnvironments = getRecentVisitedEnvironments();

        if (recentEnvironments && recentEnvironments.length > 0) {
            this.setState({ 
                awsAccount: recentEnvironments[0].accountId 
            });
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault(); 
        const { workloadName, workloadOwner, lens, awsAccount, workloadType, environment, description, istoggle, tags } = this.state;
        
        const payload = {
            workload_name: workloadName,
            workload_environment: Array.isArray(environment) && environment.length > 0 ? environment[0] : '',
            workload_lenses: typeof lens === 'string' ? [lens] : [], 
            workload_review_owners: workloadOwner ? [workloadOwner] : [],
            workload_description: description,
            workload_account_ids: [awsAccount], 
            // tags: tags.filter(tag => tag.key && tag.value) // Filter out incomplete tags
        };
        
        console.log('Submit Payload:', payload);
        try {
            // Call the API using the createWorkload function
            const response = await createWorkload(payload);
            console.log('Workload created successfully:', response);
            ToastMessage.success("Workload created successfully")
        } catch (error) {
            console.error('Error creating workload:', error.response.data );
             if(error.response.data === 'An error occurred: An error occurred (ConflictException) when calling the CreateWorkload operation: [Conflict] A workload with name workloadtest2 already exists.'){
                console.log('this is already exist');
                ToastMessage.error("Workload with same Name Exists")
                
             }
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleLensChange = (newLens) => {
        this.setState({ lens: newLens });
    };

    handleWorkloadTypeChange = (newWorkloadType) => {
        this.setState({ workloadType: newWorkloadType });
    };

    handleEnvironmentChange = (newEnvironment) => {
        this.setState({ environment: newEnvironment });
    };

    handleToggle = (toggleValue) => {
        this.setState({ istoggle: toggleValue });
    };

    // Handle tag addition and update
    handleAddTag = () => {
        this.setState(prevState => ({
            tags: [...prevState.tags, { key: '', value: '' }]
        }));
    };

    handleTagChange = (index, field, value) => {
        this.setState(prevState => {
            const newTags = [...prevState.tags];
            newTags[index][field] = value;
            return { tags: newTags };
        });
    };

    render() {
        const wafrLenses = [
            " wellarchitected",
            " connected-mobility",
            " container-build",
            // Other lenses here...
        ];

        const workloadTypes = ['Type 1', 'Type 2', 'Type 3']; // Add your types
        const environments = ['PRODUCTION', 'PREPRODUCTION']; // Environments

        const { workloadName, workloadOwner, lens, workloadType, environment, description, isWorkloadResources, istoggle, tags } = this.state;

        return (
            <div className="px-8 py-6 bg-white shadow-md rounded-lg w-full">
                <h2 className="text-2xl font-medium mb-6">Create New Workload</h2>

                <form noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className='w-[450px] '>
                        {/* Workload Name */}
                        <div className="mb-6">
                            <label htmlFor="workloadName" className="block text-gray-700 text-lg font-medium mb-2">
                                * Workload Name
                            </label>
                            <input
                                type="text"
                                id="workloadName"
                                name="workloadName"
                                value={workloadName}
                                onChange={this.handleChange}
                                placeholder="Enter workload name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Workload Owner */}
                        <div className="mb-6">
                            <label htmlFor="workloadOwner" className="block text-gray-700 text-lg font-medium mb-2">
                                * Workload Owner
                            </label>
                            <input
                                type="text"
                                id="workloadOwner"
                                name="workloadOwner"
                                value={workloadOwner}
                                onChange={this.handleChange}
                                placeholder="Enter workload owner"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Select Lens */}
                        <div className="mb-4">
                            <SelectComponent
                                lenses={wafrLenses}
                                placeholder="Select WAFR Lens"
                                label="Select WAFR Lenses"
                                checkbox={true}
                                onLensChange={this.handleLensChange}
                            />
                        </div>

                        {/* Toggle Button */}
                        <div className='mb-4 flex items-center gap-6'>
                            <ToggleButton isOn={istoggle} onChange={(value) => this.handleToggle(value)} />
                            <p className='text-black'>Create workload on your AWS account</p>
                        </div>

                        {/* Workload Type */}
                        <div className="mb-4">
                            <SelectComponent
                                lenses={workloadTypes}
                                placeholder="Select Workload Type"
                                label="Select Workload Type"
                                onLensChange={this.handleWorkloadTypeChange}
                            />
                        </div>

                        {/* Environment */}
                        <div className="mb-4">
                            <SelectComponent
                                lenses={environments}
                                placeholder="Production"
                                label="* Select Environment"
                                onLensChange={this.handleEnvironmentChange}
                            />
                        </div>

                        {/* Description */}
                        <div className="mb-4 w-2/3">
                            <label htmlFor="description" className="block text-gray-700 text-lg font-medium mb-2">
                                * Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={this.handleChange}
                                placeholder="Please enter a brief description of the workload"
                                rows="4"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        {/* Specify Workload Resources Button */}
                        <div className="flex mb-6">
                            <button
                                type="button"
                                onClick={() => this.setState({ isWorkloadResources: !isWorkloadResources })}
                                className="bg-[#B5C2FB] text-[#383874] text-lg font-semibold px-6 py-4 rounded-lg flex gap-8 items-center space-x-2"
                            >
                                <span>Specify Workload Resources</span>
                                {isWorkloadResources ? <KeyboardDoubleArrowUpIcon /> : <KeyboardDoubleArrowDownIcon />}
                            </button>
                        </div>

                        {/* Workload Resources Section */}
                        {isWorkloadResources && (
                            <div>
                                <p className="text-lg font-medium text-gray-500 mb-4">SELECT TAGS</p>
                                {tags.map((tag, index) => (
                                    <div key={index} className="flex justify-between items-center gap-10 w-2/3 mb-4">
                                        <div className="w-full">
                                            <SelectComponent
                                                lenses={environments}
                                                placeholder="Select Tag Key"
                                                label="Select Tag Name"
                                                onLensChange={(value) => this.handleTagChange(index, 'key', value)}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <SelectComponent
                                                lenses={environments}
                                                placeholder="Select Tag Value"
                                                label="Select Tag Value"
                                                onLensChange={(value) => this.handleTagChange(index, 'value', value)}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <button
                                    className='text-blue-500 font-medium'
                                    onClick={this.handleAddTag}
                                    type="button"
                                >
                                    + Add Another Tag
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mb-4">
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                            Create Workload
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreateWorkloadForm;
