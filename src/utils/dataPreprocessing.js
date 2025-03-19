/**
 * Converts the resume JSON into chunks for vector embedding
 * @param {Object} resumeData - The resume data object
 * @returns {Array} Array of chunks with text and metadata
 */
function prepareResumeChunks(resumeData) {
    const chunks = [];
    
    // Basic information chunk
    chunks.push({
      content: `Name: ${resumeData.basic_information.name}\nLocation: ${resumeData.basic_information.location}\nContact: ${resumeData.basic_information.contact.email}, ${resumeData.basic_information.contact.phone}\nProfile Summary: ${resumeData.summary}`,
      metadata: { section: 'basic_information' }
    });
    
    // Education chunks
    resumeData.education.forEach(edu => {
      chunks.push({
        content: `Education: ${edu.degree} from ${edu.institution} (${edu.years})\nGPA: ${edu.gpa}\nKey Courses: ${edu.key_coursework.join(', ')}`,
        metadata: { section: 'education', institution: edu.institution }
      });
      
      // Leadership roles if present
      if (edu.leadership_and_mentorship) {
        edu.leadership_and_mentorship.forEach(role => {
          chunks.push({
            content: `Leadership Role: ${role.role} at ${edu.institution} (${role.term})\nResponsibilities: ${role.description}`,
            metadata: { section: 'education_leadership', institution: edu.institution }
          });
        });
      }
    });
    
    // Experience chunks
    resumeData.experience.forEach(exp => {
      chunks.push({
        content: `Work Experience: ${exp.role} at ${exp.company} (${exp.years})\nKey Achievements: ${exp.achievements.join('\n- ')}`,
        metadata: { section: 'experience', company: exp.company }
      });
      
      // Technologies used
      chunks.push({
        content: `Technologies used at ${exp.company}: ${exp.technologies.join(', ')}`,
        metadata: { section: 'experience_tech', company: exp.company }
      });
    });
    
    // Technical skills chunk
    chunks.push({
      content: `Technical Skills:\nProgramming Languages: ${resumeData.technical_skills.programming_languages.join(', ')}\nFrontend: ${resumeData.technical_skills.frontend_development.join(', ')}\nBackend: ${resumeData.technical_skills.backend_development.join(', ')}\nData Visualization: ${resumeData.technical_skills.data_visualization.join(', ')}\nDatabase: ${resumeData.technical_skills.database.join(', ')}\nCloud: ${resumeData.technical_skills.cloud.join(', ')}\nDevOps: ${resumeData.technical_skills.devops.join(', ')}\nAI/ML: ${resumeData.technical_skills.gen_ai_ml.join(', ')}`,
      metadata: { section: 'technical_skills' }
    });
    
    // Projects chunks
    resumeData.projects.forEach(project => {
      chunks.push({
        content: `Project: ${project.name}\nTech Stack: ${project.tech_stack.join(', ')}\nDescription: ${project.description}`,
        metadata: { section: 'projects', name: project.name }
      });
    });
    
    // Personal interests chunk
    const interests = resumeData.personal_interests;
    chunks.push({
      content: `Personal Interests:\nHiking and Travel: ${interests.hiking_travel}\nArt and Digital Painting: ${interests.art_digital_painting}\nPoetry: ${interests.poetry}\nReading: ${interests.reading}`,
      metadata: { section: 'personal_interests' }
    });
    
    // Achievements chunk
    const achievements = resumeData.achievements;
    chunks.push({
      content: `Key Achievements:\n- ${Object.values(achievements).join('\n- ')}`,
      metadata: { section: 'achievements' }
    });
    
    // Career goals chunk
    const goals = resumeData.what_i_am_looking_for;
    chunks.push({
      content: `Career Goals and Interests:\nTeam Environment: ${goals.team_environment}\nImpactful Work: ${goals.impactful_work}\nTech-Health Intersection: ${goals.tech_health_intersection}\nLong-term Goals: ${Object.values(goals.long_term_goals).join(', ')}`,
      metadata: { section: 'career_goals' }
    });
    
    return chunks;
  }
  
  module.exports = { prepareResumeChunks };