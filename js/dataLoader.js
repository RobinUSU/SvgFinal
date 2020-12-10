const files = [
  "10E.csv",     "2ED.csv",     "3ED.csv",     "4ED.csv",  "5DN.csv",
  "5ED.csv",     "6ED.csv",     "7ED.csv",     "8ED.csv",  "9ED.csv",
  "ALA.csv",     "ALL.csv",     "APC.csv",     "ARB.csv",  "ARC.csv",
  "ARN.csv",     "ATH.csv",     "ATQ.csv",     "AVR.csv",  "BFZ.csv",
  "BNG.csv",     "BOK.csv",     "BRB.csv",     "BTD.csv",  "C13.csv",
  "C14.csv",     "C15.csv",     "CED.csv",     "CEI.csv",  "CHK.csv",
  "CHR.csv",     "CM1.csv",     "CMD.csv",     "CNS.csv",  "CONN.csv",
  "CPK.csv",     "CSP.csv",     "CST.csv",     "DD2.csv",  "DD3_DVD.csv",
  "DD3_EVG.csv", "DD3_GVL.csv", "DD3_JVC.csv", "DDC.csv",  "DDD.csv",
  "DDE.csv",     "DDF.csv",     "DDG.csv",     "DDH.csv",  "DDI.csv",
  "DDJ.csv",     "DDK.csv",     "DDL.csv",     "DDM.csv",  "DDN.csv",
  "DDO.csv",     "DDP.csv",     "DDQ.csv",     "DGM.csv",  "DIS.csv",
  "DKA.csv",     "DKM.csv",     "DPA.csv",     "DRB.csv",  "DRK.csv",
  "DST.csv",     "DTK.csv",     "EMA.csv",     "EVE.csv",  "EVG.csv",
  "EXO.csv",     "EXP.csv",     "FEM.csv",     "FRF.csv",  "FRF_UGIN.csv",
  "FUT.csv",     "GPT.csv",     "GTC.csv",     "H09.csv",  "HML.csv",
  "HOP.csv",     "ICE.csv",     "INV.csv",     "ISD.csv",  "ITP.csv",
  "JOU.csv",     "JUD.csv",     "KTK.csv",     "LEA.csv",  "LEB.csv",
  "LEG.csv",     "LGN.csv",     "LRW.csv",     "M10.csv",  "M11.csv",
  "M12.csv",     "M13.csv",     "M14.csv",     "M15.csv",  "MBS.csv",
  "MD1.csv",     "ME2.csv",     "ME3.csv",     "ME4.csv",  "MED.csv",
  "MGB.csv",     "MIR.csv",     "MM2.csv",     "MMA.csv",  "MMQ.csv",
  "MOR.csv",     "MRD.csv",     "NMS.csv",     "NPH.csv",  "ODY.csv",
  "OGW.csv",     "ONS.csv",     "ORI.csv",     "p15A.csv", "p2HG.csv",
  "pALP.csv",    "pARL.csv",    "PC2.csv",     "pCEL.csv", "pCMP.csv",
  "PCY.csv",     "PD2.csv",     "PD3.csv",     "pDRC.csv", "pELP.csv",
  "pFNM.csv",    "pGPX.csv",    "pGRU.csv",    "pGTW.csv", "pHHO.csv",
  "pJGP.csv",    "PLC.csv",     "pLGM.csv",    "pLPA.csv", "PLS.csv",
  "pMEI.csv",    "pMGD.csv",    "pMPR.csv",    "PO2.csv",  "POR.csv",
  "pPOD.csv",    "pPRE.csv",    "pPRO.csv",    "pREL.csv", "pSUM.csv",
  "pSUS.csv",    "PTK.csv",     "pWCQ.csv",    "pWOR.csv", "pWOS.csv",
  "pWPN.csv",    "RAV.csv",     "ROE.csv",     "RQS.csv",  "RTR.csv",
  "S00.csv",     "S99.csv",     "SCG.csv",     "SHM.csv",  "SOI.csv",
  "SOK.csv",     "SOM.csv",     "STH.csv",     "THS.csv",  "TMP.csv",
  "TOR.csv",     "TPR.csv",     "TSB.csv",     "TSP.csv",  "UDS.csv",
  "UGL.csv",     "ULG.csv",     "UNH.csv",     "USG.csv",  "V09.csv",
  "V10.csv",     "V11.csv",     "V12.csv",     "V13.csv",  "V14.csv",
  "V15.csv",     "VAN.csv",     "VIS.csv",     "VMA.csv",  "W16.csv",
  "WTH.csv",     "WWK.csv",     "ZEN.csv"

];

/* Async loads data files
 *
 * @param[in] resolve -- async resolve function, data files are passed in to
 *  resolve
 * @param[in] reject -- async reject function
 * */
async function loadDataset(resolve, reject)
{
  const dataFolder = '/data/mtgcsv-master/csv/';

  let dataFiles = [];

  let promises = [];

  files.forEach(file => {
    promises.push(d3.csv("data/mtgcsv-master/csv/" + file).then(dataFile => {
      dataFiles.push(dataFile);
    }));
  });

  Promise.all(promises).then((res) => {
    resolve(dataFiles);
  });
}
