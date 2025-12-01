// export async function POST(request) {
//   try {
//     const { profile } = await request.json();

//     const finalPayload = {
//       event: "linkedin_oauth_success",
//       user_email: profile.email,
//       user_name: profile.name,
//       linkedin_id: profile.sub,
//       email_verified: profile.email_verified,
//       timestamp: new Date().toISOString()
//     };

//     const webhookResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'User-Agent': 'Mozilla/5.0 (compatible; LinkedIn-OAuth/1.0)'
//       },
//       body: JSON.stringify(finalPayload),
//     });

//     const responseText = await webhookResponse.text();

//     return Response.json({
//       status: webhookResponse.status === 200 ? 'delivered' : 'failed',
//       response: responseText
//     });
//   } catch (error) {
//     console.error('Webhook error:', error);
//     return Response.json({
//       status: 'failed',
//       response: error.message
//     });
//   }
// }














export async function POST(request) {
  try {
    // const { profile } = await request.json();
    const { profile, careerParams } = await request.json();

    // Format education data for webhook
    const formattedEducation = profile.education?.map(edu => ({
      school: edu.schoolName,
      field_of_study: edu.fieldOfStudy,
      degree: edu.degreeName,
      start_date: edu.startDate ? `${edu.startDate.year}-${edu.startDate.month || '01'}` : null,
      end_date: edu.endDate ? `${edu.endDate.year}-${edu.endDate.month || '01'}` : null,
      activities: edu.activities,
      description: edu.description
    })) || [];

    // Format experience data for webhook
    const formattedExperience = profile.experience?.map(exp => ({
      title: exp.title,
      company: exp.company?.name,
      summary: exp.summary,
      start_date: exp.startDate ? `${exp.startDate.year}-${exp.startDate.month || '01'}` : null,
      end_date: exp.endDate ? `${exp.endDate.year}-${exp.endDate.month || '01'}` : null,
      is_current: !exp.endDate
    })) || [];

    // const finalPayload = {
    //   event: "linkedin_oauth_success",
    //   user_email: profile.email,
    //   user_name: profile.name,
    //   linkedin_id: profile.sub,
    //   email_verified: profile.email_verified,
    //   education: formattedEducation,
    //   work_experience: formattedExperience,
    //   education_count: formattedEducation.length,
    //   experience_count: formattedExperience.length,
    //   timestamp: new Date().toISOString()
    // };

    const finalPayload = {
      event: "linkedin_oauth_success",
      user_email: profile.email,
      user_name: profile.name,
      linkedin_id: profile.sub,
      email_verified: profile.email_verified,
      education: formattedEducation,
      work_experience: formattedExperience,
      education_count: formattedEducation.length,
      experience_count: formattedExperience.length,
      careerParams: careerParams || {},   // ✅ include this
      timestamp: new Date().toISOString()
    };

    const webhookResponse = await fetch(process.env.N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (compatible; LinkedIn-OAuth/1.0)'
      },
      body: JSON.stringify(finalPayload),
    });

    const responseText = await webhookResponse.text();

    return Response.json({
      status: webhookResponse.status === 200 ? 'delivered' : 'failed',
      response: responseText
    });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({
      status: 'failed',
      response: error.message
    });
  }
}