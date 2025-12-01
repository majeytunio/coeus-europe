// 'use client';

// import { useState } from 'react';

// export default function CareerForm({ linkedin, careerParams }) {
//   const [form, setForm] = useState({
//     full_name: linkedin.name || '',
//     email: linkedin.email || '',
//     phone: '',
//     address: '',
//     street_address: '',
//     city: '',
//     country: '',
//     position_applied_for: careerParams['position_applied_for_(job_title)'] || '',
//     position_location: careerParams['position_location'] || '',
//     source_of_application: careerParams['source_of_application'] || '',
//     years_experience: linkedin.experience?.length || '',
//     highest_education: linkedin.education?.[0]?.degreeName || '',
//     linkedin_url: `https://linkedin.com/in/${linkedin.sub}`,
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     await fetch('/api/career/submit', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(form),
//     });

//     alert('Application Submitted!');
//   };

//   return (
//     <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow text-black">
//       <h2 className="text-2xl font-bold mb-4">Career Application Form</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">

//         <input name="full_name" value={form.full_name} onChange={handleChange} className="w-full border p-2" />

//         <input name="email" value={form.email} onChange={handleChange} className="w-full border p-2" />

//         <input name="phone" value={form.phone} onChange={handleChange} className="w-full border p-2" />

//         <input name="position_applied_for" value={form.position_applied_for} onChange={handleChange} className="w-full border p-2" />

//         <input name="position_location" value={form.position_location} onChange={handleChange} className="w-full border p-2" />

//         <input name="source_of_application" value={form.source_of_application} onChange={handleChange} className="w-full border p-2" />

//         <input name="linkedin_url" value={form.linkedin_url} onChange={handleChange} className="w-full border p-2" />

//         <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
//       </form>
//     </div>
//   );
// }











import React, { useEffect, useState, useRef } from 'react';

// CareerForm.jsx
// A single-file React (Next.js / client) component styled with Tailwind.
// Usage: <CareerForm linkedin={linkedin} careerParams={careerParams} />
// - linkedin: object returned from your profile endpoint (may contain name, email, experience[], education[])
// - careerParams: object of initial URL params (e.g. { 'position_applied_for_(job_title)': 'Engineer', position_location: 'Antwerpen', source_of_application: 'LinkedIn' })

export default function CareerForm({ linkedin = {}, careerParams = {} }) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    addressSearch: '',
    streetAddress: '',
    city: '',
    country: '',
    positionAppliedFor: '',
    positionLocation: '',
    dateOfApplication: '',
    sourceOfApplication: '',
    resumeFileName: '',
    yearsOfExperience: '',
    highestEducation: '',
    portfolioLinkedinUrl: '',
    knowledgeTestCompleted: false,
    hseStrategyTestCompleted: false,
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const fileInputRef = useRef(null);

  // Map careerParams keys to our internal fields. This allows for the odd key names in the QR link.
  const mapCareerParams = (params) => {
    if (!params) return {};
    return {
      positionAppliedFor:
        params.position_applied_for ||
        params['position_applied_for_(job_title)'] ||
        // params.position_applied_for_(job_title) ||
        params.position_applied_for__job_title ||
        '',
      positionLocation: params.position_location || params.location || '',
      sourceOfApplication: params.source_of_application || params.source || '',
    };
  };

  // Auto-fill from linkedin and careerParams on mount
  useEffect(() => {
    const initial = { ...form };

    // LinkedIn fields - adapt to your API shape
    if (linkedin) {
      initial.fullName = linkedin.name || linkedin.localizedFirstName
        ? `${linkedin.localizedFirstName || ''} ${linkedin.localizedLastName || ''}`.trim()
        : initial.fullName;
      initial.email = linkedin.email || linkedin.mail || linkedin['emailAddress'] || initial.email;
      initial.yearsOfExperience = linkedin.experience ? linkedin.experience.length : initial.yearsOfExperience;
      initial.highestEducation = (linkedin.education && linkedin.education[0] && (linkedin.education[0].degreeName || linkedin.education[0].fieldOfStudy)) || initial.highestEducation;
      // LinkedIn profile url if available
      if (!initial.portfolioLinkedinUrl && linkedin.vanityName) {
        initial.portfolioLinkedinUrl = `https://linkedin.com/in/${linkedin.vanityName}`;
      } else if (!initial.portfolioLinkedinUrl && linkedin.sub) {
        initial.portfolioLinkedinUrl = `https://linkedin.com/in/${linkedin.sub}`;
      }
    }

    // URL / QR params
    const mapped = mapCareerParams(careerParams);
    initial.positionAppliedFor = mapped.positionAppliedFor || initial.positionAppliedFor;
    initial.positionLocation = mapped.positionLocation || initial.positionLocation;
    initial.sourceOfApplication = mapped.sourceOfApplication || initial.sourceOfApplication;

    setForm(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkedin, careerParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setResumeFile(f);
      setForm((prev) => ({ ...prev, resumeFileName: f.name }));
    }
  };

  const clearFile = () => {
    setResumeFile(null);
    setForm((prev) => ({ ...prev, resumeFileName: '' }));
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    try {
      // Build multipart form data to support file upload
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        fd.append(k, v !== null && v !== undefined ? v : '');
      });

      if (resumeFile) fd.append('resume', resumeFile);

      // Include raw linkedin & careerParams for server side processing if you want
      fd.append('linkedin_raw', JSON.stringify(linkedin || {}));
      fd.append('career_params', JSON.stringify(careerParams || {}));

      const res = await fetch('/api/career/submit', {
        method: 'POST',
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');

      setSubmitResult({ ok: true, message: data.message || 'Submitted' });
    } catch (err) {
      setSubmitResult({ ok: false, message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 text-black">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-6 text-center">Personal Information</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name *</label>
            <input
              name="fullName"
              value={form.fullName || linkedin.name || ''}
              onChange={handleChange}
              placeholder="Full Name"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email *</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone *</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          {/* Address search + Street */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              name="addressSearch"
              value={form.addressSearch}
              onChange={handleChange}
              placeholder="Search address"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Street Address *</label>
            <input
              name="streetAddress"
              value={form.streetAddress}
              onChange={handleChange}
              placeholder="Address"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City *</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="City"
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country *</label>
              <input
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="Country"
                className="mt-1 block w-full border rounded p-2"
              />
            </div>
          </div>

          {/* Job Details */}
          <h2 className="text-lg font-semibold">Job Details</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position Applied For (Job Title) *</label>
            <input
              name="positionAppliedFor"
              value={form.positionAppliedFor}
              onChange={handleChange}
              placeholder="Please choose the job you are applying for"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Position Location</label>
            <input
              name="positionLocation"
              value={form.positionLocation}
              onChange={handleChange}
              placeholder="Choose the position location you are applying for."
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Application</label>
            <input
              name="dateOfApplication"
              value={form.dateOfApplication}
              onChange={handleChange}
              type="date"
              placeholder="Date of Application"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Source of Application *</label>
            <input
              name="sourceOfApplication"
              value={form.sourceOfApplication}
              onChange={handleChange}
              placeholder="Source of Application (e.g., LinkedIn, Career Site, Referral)"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          {/* Qualifications & Experience */}
          <h2 className="text-lg font-semibold">Qualifications & Experience</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">Resume/CV Upload *</label>
            <div className="mt-1 border rounded p-4 text-center">
              <input ref={fileInputRef} type="file" onChange={handleFileChange} className="mx-auto" />
              {form.resumeFileName && (
                <div className="mt-2 text-sm text-gray-600 flex items-center justify-center gap-2">
                  <span>{form.resumeFileName}</span>
                  <button type="button" onClick={clearFile} className="text-red-600 underline text-xs">Remove</button>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Years of Relevant Experience *</label>
            <input
              name="yearsOfExperience"
              value={form.yearsOfExperience}
              onChange={handleChange}
              placeholder="Years of Relevant Experience"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Highest Level of Education *</label>
            <input
              name="highestEducation"
              value={form.highestEducation}
              onChange={handleChange}
              placeholder="Highest Level of Education"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Portfolio/LinkedIn URL</label>
            <input
              name="portfolioLinkedinUrl"
              value={form.portfolioLinkedinUrl}
              onChange={handleChange}
              placeholder="Portfolio/LinkedIn URL"
              className="mt-1 block w-full border rounded p-2"
            />
          </div>

          <div className="space-y-2">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 underline text-sm">Click here to complete the Knowledge Test.</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="text-blue-600 underline text-sm">Click here to complete the HSE Strategy Test.</a>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="knowledgeTestCompleted"
                checked={form.knowledgeTestCompleted}
                onChange={handleChange}
              />
              <span className="text-sm">Knowledge Test Completed</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="hseStrategyTestCompleted"
                checked={form.hseStrategyTestCompleted}
                onChange={handleChange}
              />
              <span className="text-sm">HSE Strategy Test Completed</span>
            </label>
          </div>

          <div className="text-center mt-6">
            <button
              type="submit"
              disabled={submitting}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded w-full md:w-auto"
            >
              {submitting ? 'Sending...' : 'Send'}
            </button>
          </div>

          {submitResult && (
            <div className={`mt-4 p-3 rounded ${submitResult.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {submitResult.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
