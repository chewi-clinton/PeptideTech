// PubChem CIDs and alt text extracted directly from the live reference
// site's product pages (peptidetech.is/p/<slug>) via Chrome DevTools — not
// guessed. Products absent from this map genuinely have no molecular
// structure thumbnail on the reference site either (accessories, cases,
// and a handful of compounds PubChem has no clean structure image for).
export const MOLECULAR_STRUCTURES = {
  "5-amino-1mq-50mg": { cid: 66522933, alt: "2D molecular structure of 5-Amino-1MQ, CAS 42464-96-0, C10H11N2I." },
  "5-amino-1mq-capsules": { cid: 66522933, alt: "2D molecular structure of 5-Amino-1MQ, CAS 42464-96-0, C10H11N2I." },
  "ahk-cu-100mg": { cid: 168431292, alt: "2D molecular structure of AHK-Cu, CAS 682809-81-0, C15H24ClCuN6O4." },
  "aicar-50mg": { cid: 65110, alt: "2D molecular structure of AICAR, CAS 3031-94-5, C9H15N4O8P." },
  "aod-9604-5mg": { cid: 71300630, alt: "2D molecular structure of AOD-9604, CAS 221231-10-3, C78H123N23O23S2." },
  "bpc-157": { cid: 9941957, alt: "2D molecular structure of BPC-157, CAS 137525-51-0, C62H98N16O22." },
  "bpc-157-research-capsules": { cid: 9941957, alt: "2D molecular structure of BPC-157, CAS 137525-51-0, C62H98N16O22." },
  "cjc-1295-no-dac-5mg": { cid: 91971820, alt: "2D molecular structure of CJC-1295 No DAC, CAS 863288-34-0, C165H269N47O46." },
  "cjc-1295-with-dac-5mg": { cid: 91971820, alt: "2D molecular structure of CJC-1295 with DAC, CAS 863288-34-0, C165H269N47O46." },
  "dihexa-research-capsules": { cid: 129010512, alt: "2D molecular structure of DIHEXA, CAS 1401708-83-5, C27H44N4O5." },
  "dsip-5mg": { cid: 68816, alt: "2D molecular structure of DSIP, CAS 62568-57-4, C35H48N10O15." },
  "epitalon-10mg": { cid: 219042, alt: "2D molecular structure of Epitalon, CAS 307297-39-8, C14H22N4O9." },
  "ghk-cu": { cid: 139035031, alt: "2D molecular structure of GHK-Cu, C14H21CuN6O4." },
  "glutathione-1500mg": { cid: 124886, alt: "2D molecular structure of Glutathione, CAS 70-18-8, C10H17N3O6S." },
  "ipamorelin": { cid: 9831659, alt: "2D molecular structure of Ipamorelin, CAS 170851-70-4, C38H49N9O5." },
  "kisspeptin-10-10mg": { cid: 25240297, alt: "2D molecular structure of Kisspeptin-10, CAS 374675-21-5, C63H83N17O14." },
  "kpv-10mg": { cid: 125672, alt: "2D molecular structure of KPV, CAS 88768-11-0, C16H30N4O4." },
  "ll-37-10mg": { cid: 16198951, alt: "2D molecular structure of LL-37, CAS 154947-66-7, C205H340N60O53." },
  "mots-c-10mg": { cid: 146675088, alt: "2D molecular structure of MOTS-c, C101H152N28O22S2." },
  "mtii-10mg": { cid: 92432, alt: "2D molecular structure of MT2, CAS 121062-08-6, C50H69N15O9." },
  "nad": { cid: 5892, alt: "2D molecular structure of NAD+, CAS 53-84-9, C21H27N7O14P2." },
  "oxytocin": { cid: 439302, alt: "2D molecular structure of Oxytocin, CAS 50-56-6, C43H66N12O12S2." },
  "pnc-27-10mg": { cid: 16201774, alt: "2D molecular structure of PNC-27, CAS 1159861-00-3, C188H293N53O44S." },
  "pt-141-10mg": { cid: 9941379, alt: "2D molecular structure of PT-141, CAS 189691-06-3, C50H68N14O10." },
  "ru58841-5-liquid-dropper": { cid: 132981, alt: "2D molecular structure of RU58841, CAS 154992-24-2, C17H18F3N3O3." },
  "selank-5mg": { cid: 11765600, alt: "2D molecular structure of Selank, CAS 129954-34-3, C33H57N11O9." },
  "semax-5mg": { cid: 9811102, alt: "2D molecular structure of Semax, CAS 80714-61-0, C37H51N9O10S." },
  "sermorelin-5mg": { cid: 16132413, alt: "2D molecular structure of Sermorelin, CAS 86168-78-7, C149H246N44O42S." },
  "slu-pp-332-research-capsules": { cid: 5338394, alt: "2D molecular structure of SLU-PP-332, CAS 303760-60-3, C18H14N2O2." },
  "snap-8-10mg": { cid: 71587832, alt: "2D molecular structure of SNAP-8, CAS 868844-74-0, C42H72N16O15S." },
  "tb-500": { cid: 45382195, alt: "2D molecular structure of TB-500, C212H350N56O78S." },
  "tesofensine-research-capsules": { cid: 11370864, alt: "2D molecular structure of Tesofensine, CAS 195875-84-4, C17H23Cl2NO." },
  "hgh-somatropin-10iu": { cid: 168009821, alt: "2D molecular structure of HGH (Somatropin), CAS 12629-01-5, C990H1528N262O300S7." },
  "retatrutide-30mg": { cid: 171934787, alt: "2D molecular structure of Retatrutide, CAS 2381089-83-2, C221H342N46O68." },
  "ss-31-elamipretide-10mg": { cid: 11764719, alt: "2D molecular structure of SS-31 (Elamipretide), CAS 736992-21-5, C32H49N9O5." },
  "cagrilintide-5mg": { cid: 171397054, alt: "2D molecular structure of Cagrilintide, CAS 1415456-99-3, C194H312N54O59S2." },
  "mt-2-melanotan-ii-10mg": { cid: 92432, alt: "2D molecular structure of MT-2 (Melanotan II), CAS 121062-08-6, C50H69N15O9." },
  "tb-500-10mg-vial": { cid: 62707662, alt: "2D molecular structure of TB-500, CAS 885340-08-9, C38H68N10O14." },
};

export function getMolecularStructureImage(slug) {
  const entry = MOLECULAR_STRUCTURES[slug];
  if (!entry) return null;
  return {
    id: "molecular-structure",
    image: `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${entry.cid}/PNG`,
    alt_text: entry.alt,
  };
}
