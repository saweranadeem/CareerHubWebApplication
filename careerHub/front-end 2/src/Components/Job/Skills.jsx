import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Nav from "../Home/Nav";
import Footer from "../Home/Footer";

const Skills = () => {
  const { id } = useParams();
  const [skills, setSkills] = useState([]);
  const [error, setError] = useState(null);
  const [newSkill, setNewSkill] = useState({ name: '', level: '' });

  useEffect(() => {
    if (id) {
      fetchSkills();
    }
  }, [id]);

  const fetchSkills = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/skills/${id}`);
      setSkills(response.data);
    } catch (error) {
      console.error('There was an error fetching the skills!', error);
    }
  };

  const handleAddSkill = async () => {
    try {
      const { name, level } = newSkill;
      const parsedLevel = Math.min(100, Math.max(0, parseInt(level, 10) || 0)); // Ensure level is between 0 and 100
      await axios.post(`http://localhost:3000/skills/${id}`, { name, level: parsedLevel });
      setNewSkill({ name: '', level: '' });
      fetchSkills();
    } catch (error) {
      console.error('There was an error adding the skill!', error);
    }
  };

  const handleDeleteSkill = async (skillId) => {
    if (!skillId) {
      console.error('Skill ID is undefined');
      setError('Skill ID is undefined');
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:3000/skills/${skillId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        const errorData = response.data;
        throw new Error(errorData.message || 'Failed to delete skill');
      }

      setSkills((prevSkills) => prevSkills.filter((skill) => skill._id !== skillId));
      console.log('Skill deleted successfully');
    } catch (err) {
      console.error('Error deleting skill:', err);
      setError(err.message || 'Error deleting skill');
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-primary text-white flex flex-col md:flex-row py-8 px-4">
        <Nav />
        <div className="w-full md:w-1/2 flex-shrink-0 md:px-20 px-10 mb-8 md:mt-24 mt-16 md:mb-0 bg-transparent shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Add Skill</h2>
          <div className="mb-4">
            <label className="block mb-2 text-md">Skill Name</label>
            <input
              type="text"
              placeholder="Skill Name"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="p-3 bg-gray-900 text-white rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg">Skill Level (0-100)</label>
            <input
              type="number"
              placeholder="Skill Level"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
              className="p-3 bg-gray-900 text-white rounded w-full"
              min="0"
              max="100"
            />
          </div>
          <button
            onClick={handleAddSkill}
            className="p-3 bg-orange-400 text-white rounded w-full hover:bg-orange-500 transition duration-300"
          >
            Add Skill
          </button>
        </div>
        <div className="w-full md:w-1/2 md:mt-24 mt-8 overflow-y-auto md:px-20 px-10 bg-primary">
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="flex flex-col space-y-6">
            {skills.map((skill) => (
              <div key={skill._id} className="flex items-center justify-between space-x-4">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">{skill.name}</span>
                    <span className="text-lg font-semibold">{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-700 h-2 rounded">
                    <motion.div
                      className="bg-orange-400 h-2 rounded"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1 }}
                    ></motion.div>
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  onClick={() => handleDeleteSkill(skill._id)}
                  className="text-red-500 cursor-pointer hover:text-red-600 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>     
      </div>
      <Footer />
    </div>
  );
};

export default Skills;
