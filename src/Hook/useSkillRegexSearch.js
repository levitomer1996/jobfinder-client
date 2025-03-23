import { useState } from "react";
import jts from "../API/jts";

const useSkillRegexSearch = () => {
  const [skillsResults, setResults] = useState([]);

  const searchSkills = async (query) => {
    if (!query) return;

    try {
      const response = await jts.get(`/skill/regexsearch?q=${query}`);
      setResults(response.data);
      console.log(skillsResults);
    } catch (err) {
      console.error("An error occurred", err);
    }
  };

  return { skillsResults, searchSkills };
};

export default useSkillRegexSearch;
