
import React, { Component } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Typography
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { APP_PREFIX_PATH } from 'Configs/AppConfig';
import { getRecentVisitedEnvironments } from 'Utils';
import axios from 'axios';

// Define constants for message and API URL
const NO_WORKLOADS_MESSAGE = "There are no workloads.";
const API_URL = `https://example.com`;

class WorkloadsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentEnvironments: null,
      workloads: [], // Default to an empty array
    };
  }

  componentDidMount() {
    const recentEnvironments = getRecentVisitedEnvironments();
    
    if (recentEnvironments) {
      this.setState({ recentEnvironments }, this.fetchWorkloads);  
    }
  }

  // Axios function to fetch API data
  fetchWorkloads = async () => {
    const { recentEnvironments } = this.state;

    if (recentEnvironments && recentEnvironments.length > 0) {
      const accountId = recentEnvironments[0].accountId; // Assuming the accountId is at index 0

      try {
        const response = await axios.get(`${API_URL}?AccountId=${accountId}`);
        console.log('this is the account id',accountId);
        
        console.log("response", response);
        
        // Update the state with fetched data
        this.setState({ workloads: response.data || [] });
      } catch (error) {
        this.setState({ error: 'Failed to fetch workloads' });
        console.error('Error fetching workloads:', error);
      }
    }
  };

  renderStatusBadge(status) {
    const styles = {
      Pending: { backgroundColor: '#ffcc00', color: '#ffffff', padding: '3px 8px', borderRadius: '4px' },
      Submitted: { backgroundColor: '#4caf50', color: '#ffffff', padding: '3px 8px', borderRadius: '4px' },
      'In-progress': { backgroundColor: '#9e9e9e', color: '#ffffff', padding: '3px 8px', borderRadius: '4px' },
    };

    return (
      <span style={styles[status]}>
        {status}
      </span>
    );
  }

  render() {
    const { workloads, recentEnvironments } = this.state;
    console.log("this is the test", recentEnvironments);

    return (
      <Box p={3}>
        <Typography variant="h5" gutterBottom>Workloads</Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Box>
            <Button variant="outlined" sx={{ borderColor: 'blue', color: 'blue' }} style={{ marginRight: 8 }}>All Workloads</Button>
            <Button variant="outlined" sx={{ borderColor: 'blue', color: 'blue' }}>Well-Architected Framework Review</Button>
          </Box>
          <Link to={`${APP_PREFIX_PATH}/wafr/createworkload`}>
            <Button variant="contained" sx={{ background: 'blue' }}>Create New Workload</Button>
          </Link>
        </Box>

        {/* Table with Header */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Workloads</strong></TableCell>
                <TableCell><strong>Assessments States</strong></TableCell>
                <TableCell><strong>Workload Type</strong></TableCell>
                <TableCell><strong>Last Uploaded</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Conditional Rendering: Show table rows or message */}
              {workloads.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" color="textSecondary">{NO_WORKLOADS_MESSAGE}</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                workloads.map((workload) => (
                  <TableRow key={workload.id}>
                    <TableCell>
                      <Link to={`${APP_PREFIX_PATH}/wafr/workload`}>
                        {workload.id}
                      </Link>
                    </TableCell>
                    <TableCell>{this.renderStatusBadge(workload.status)}</TableCell>
                    <TableCell sx={{ color: 'blue' }}>{workload.type}</TableCell>
                    <TableCell>{workload.lastUploaded}</TableCell>
                    <TableCell>
                      <MoreVert />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }
}

export default WorkloadsTable;
