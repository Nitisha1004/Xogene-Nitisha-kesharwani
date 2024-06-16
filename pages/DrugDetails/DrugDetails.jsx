import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DrugDetails = ({ match }) => {
  const { drugName } = match.params;
  const [drugInfo, setDrugInfo] = useState(null);
  const [ndcs, setNdcs] = useState([]);

  useEffect(() => {
    const fetchDrugInfo = async () => {
      try {
        const response = await axios.get(`https://rxnav.nlm.nih.gov/REST/drugs.json?name=${drugName}`);
        const conceptProperties = response.data.drugGroup.conceptGroup[0].conceptProperties[0];
        setDrugInfo(conceptProperties);
        const ndcResponse = await axios.get(`https://rxnav.nlm.nih.gov/REST/rxcui/${conceptProperties.rxcui}/ndcs.json`);
        setNdcs(ndcResponse.data.ndcGroup.ndcList.ndc);
      } catch (error) {
        console.error('Error fetching drug info:', error);
      }
    };
    fetchDrugInfo();
  }, [drugName]);

  if (!drugInfo) return <p>Loading...</p>;

  return (
    <div>
      <h1>{drugName}</h1>
      <p><strong>RxCUI:</strong> {drugInfo.rxcui}</p>
      <p><strong>Name:</strong> {drugInfo.name}</p>
      <p><strong>Synonym:</strong> {drugInfo.synonym}</p>
      <h2>Associated NDCs</h2>
      <ul>
        {ndcs.map(ndc => (
          <li key={ndc}>{ndc}</li>
        ))}
      </ul>
    </div>
  );
};

export default DrugDetails;
