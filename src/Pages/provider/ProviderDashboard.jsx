import React, { useState, useEffect } from "react";
import axios from "axios";
import JobAnalytics from "../../component/Provider/JobAnalytics.jsx";
import JobListing from "../../component/Provider/JobListing.jsx";
import CompletedJobsHistory from "../../component/Provider/CompletedJobsHistory.jsx";
import Summary from "../../component/Provider/Summary.jsx";
import Payment from "../../component/Provider/Payment.jsx";
import { API_URL } from "../../Api.jsx";

const ProviderDashboard = () => {
  const [provider, setProvider] = useState({
    name: "Arun Yadav",
  });

  // useEffect(() => {
  //   // Fetch provider data for dashboard
  //   const fetchProviderData = async () => {
  //     try {
  //       const res = await axios.get('${API_URL}/api/provider/dashboard', { withCredentials: true });
  //       if (res.data.success) {
  //         setProvider(res.data.provider);
  //         setJobApplications(res.data.jobApplications);
  //         setActiveJobs(res.data.activeJobs);
  //         setCompletedJobs(res.data.completedJobs);
  //         setPayments(res.data.payments);
  //         setChatData(res.data.chatData);
  //       }
  //     } catch (error) {
  //       toast.error('Error fetching provider data', { theme: 'dark', position: 'top-center' });
  //     }
  //   };
  //   fetchProviderData();
  // }, []);

  if (!provider) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6 py-20">
      {/* <h1 className="text-2xl font-bold">{provider?.name}'s Dashboard</h1> */}
      <Summary />
      <JobAnalytics />
      <JobListing />
      {/* <CompletedJobsHistory/> */}
      <Payment />
    </div>
  );
};

export default ProviderDashboard;
