import { _getAll } from '../utils/apiUtils'; 

const fetchData = async () => {
  try {
    const data = await _getAll('/candidate');
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};