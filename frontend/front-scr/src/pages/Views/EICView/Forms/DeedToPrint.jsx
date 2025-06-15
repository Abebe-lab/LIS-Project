//TODO: format using mui and use aspect ratio from image
import React from "react";
import { Flag, EICLogo } from "../../../../assets/image/print";
import "./PrintDeed.css";
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid } from "@mui/material";
const TitleDeedCoordinateTable = ({ coordinates }) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="title deed coordinates table">
        <TableHead>
          <TableRow>
            <TableCell>No</TableCell>
            <TableCell>X</TableCell>
            <TableCell>Y</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coordinates[0].map((coord, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{coord[0]}</TableCell>
              <TableCell>{coord[1]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
//prettier-ignore
const DeedToPrint = React.forwardRef(({ dataToPrint }, ref) => {
  const { UPIN, parkName, region, block, code, description, natureOfTitle, area, titleDeedNo,
    applicationDate, documentType, serviceType, idOrPassportNo, fullName, address, entryDate, endingDate,
    encumbranceNature, documentNo, coordinates,
  } = dataToPrint;
  return (
    <div ref={ref} className="print">
      {/**, height: '1754px', width: '1240px' */}
      <Title title="Federal Democratic Republic of Ethiopia" titleAmharic="የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ" />
      <SubTitle title="INDUSTRY PARKS DEVELOPMENT CORPORATION" />
      <SubTitle
        title="Industry parks’ land parcel lease/sublease/rent contract ownership form"
        titleAmharic="የእንዱስትሪ ፓርኮቸ ቁራሽ መሬት በሊዝ/ንኡስ ሊዝ/ኪራይ ይዞታ መመዝገቢያ ቅጽ"
      />

      <div>""</div>
      <div style={{ paddingRight: "25px" }}>
        <div style={{ width: "100%", textAlign: "right" }}>
          <h4>የቁራሽ መሬት ልዩ መለያ ኮድ {"    "}</h4>
        </div>
        <div style={{ width: "100%", textAlign: "right" }}>
          <u>
            <h4>UPIC:{UPIN}</h4>
          </u>
        </div>
      </div>
      <hr />
      <div style={{ borderColor: "black", paddingLeft: "12px", height: "4%" }}>
        <h3 style={{ fontWeight: "bold" }}>ሀ. የይዞታ መግለጫ ክፍል</h3>
        <h3 style={{ fontWeight: "bold" }}>A. PROPERTY SECTION</h3>
      </div>
      <hr />
      <div className="row" style={{ height: "12%" }}>
        <div className="col-2">
          <h5>እንዱስትሪ ፓርክ ስም</h5>
          <h5 className="pb-4">Industrial Park Name:</h5>
          <h4>{parkName}</h4>
        </div>
        <div className="col-2">
          <h5>የሚገኝበት ከተማ/ክልል: </h5>
          <h5 className="pb-4">Region: </h5>
          <h4>{region}</h4>
        </div>
        <div className="col-4">
          <h5>የፓርኩ ጣቢያ ኮድ :</h5>
          <h5 className="pb-4">(Park Block code) :</h5>
          <h4>{UPIN}</h4>
        </div>
        <div className="col-4">
          <h5> መግለጫ :</h5>
          <h5 className="pb-4"> (Description) :</h5>
          <h5>{description}</h5>
        </div>
      </div>
      <hr />
      <div className="row" style={{ height: "8%" }}>
        <div className="col-9">
          <h5>የይዞታው ስሪት </h5>
          <h5 className="pb-4">(Nature of Title)፡</h5>
          <h4>{natureOfTitle}</h4>
        </div>
        <div className="col-3">
          <h5 className="pb-4">የይዞታው ስፋት (Area of Parce)</h5>
          <u>
            <h4>{area}</h4>
          </u>
        </div>
      </div>
      <hr />
      <div className="row" style={{ height: "6%" }}>
        <div className="col-9">
          <h5 className="pb-4">የይዞታ ቁጥር (Parcel title deed Number):</h5>
          <h4>{titleDeedNo}</h4>
        </div>
        <div className="col-3"></div>
      </div>
      <hr />
      <div className="row" style={{ height: "12%" }}>
        <div className="col-2">
          <h5 className="pb-4">ማመልከቻ የቀረበበት ቀን (Application Date)</h5>
          <h4>{applicationDate}</h4>
        </div>
        <div className="col-2">
          <h5 className="pb-4">የተመዘገበ ማስረጃ ዓይነት (Document type):</h5>
          <h4>{documentType}</h4>
        </div>
        <div className="col-5">
          <h5>የቦታው አገልግሎት </h5>
          <h5 className="pb-4">(Type of service):</h5>
          <h4>{serviceType}</h4>
        </div>
        <div className="col-3">
          <h5>የምዝገባ ሹም ፊርማ</h5>
          <h5 className="pb-4">(Signature of Registration Officer)</h5>
          {/*<h5></h5>*/}
        </div>
      </div>
      <hr />
      <div style={{ borderColor: "black", paddingLeft: "12px", height: "4%" }}>
        <h3 style={{ fontWeight: "bold" }}>ለ. የባለይዞታው መረጃ ክፍል</h3>
        <h3 style={{ fontWeight: "bold" }}>B. PROPRIETORSHIP SECTION</h3>
      </div>
      <hr />
      <div>
        <Grid container>
          <Grid item md={8}></Grid>
          <Grid item md={4}>
            {<TitleDeedCoordinateTable coordinates={coordinates} />}
          </Grid>
        </Grid>
      </div>
      <hr />

      <div className="row" style={{ height: "12%" }}>
        <div className="col-2">
          <h5>ማመልከቻ የቀረበበት ቀን</h5>
          <h5 className="pb-4">Date of application</h5>
          <h4>{applicationDate}</h4>
        </div>
        <div className="col-2">
          <h5>የመታወቂያ/ፓስፖርት ቁጥር</h5>
          <h5 className="pb-4">(ID card/passport No)</h5>
          <h4>{idOrPassportNo}</h4>
        </div>
        <div className="col-4">
          <h5>የባለይዞታ ሙሉ ስም</h5>
          <h5 className="pb-4">Full Name of the proprietor</h5>
          <h4>{fullName}</h4>
        </div>
        <div className="col-4">
          <h5 className="pb-4">አድራሻ (Proprietor’s Address)</h5>
          <h4>{address}</h4>
        </div>
      </div>
      <hr />
      <div style={{ borderColor: "black", paddingLeft: "12px", height: "4%" }}>
        <h3 style={{ fontWeight: "bold" }}>ሐ. ክልከላና ኃላፊነት ክፍል</h3>
        <h3 style={{ fontWeight: "bold" }}>C. Restriction & Responsibility Section</h3>
      </div>
      <hr />
      <div className="row" style={{ height: "10%" }}>
        <div className="col-2">
          <h5>ግዴታ የተገባበት ቀን</h5>
          <h5 className="pb-4">Entry Date:</h5>
          <h4>{entryDate}</h4>
        </div>
        <div className="col-2">
          <h5>ግዴታው የሚያበቃበት ቀን</h5>
          <h5 className="pb-4">Date of Finishing:</h5>
          <h4>{endingDate}</h4>
        </div>
        <div className="col-4">
          <h5>የግዴታው ዓይነት</h5>
          <h5 className="pb-4">Nature of Encumbrance:</h5>
          <h4>{encumbranceNature}</h4>
        </div>
        <div className="col-4">
          <h5>ግዴታው የተመዘገበበት ሰነድ ቁጥር</h5>
          <h5 className="pb-4">Document No:</h5>
          <h4>{documentNo}</h4>
        </div>
      </div>
      <hr />
    </div>
  );
});

const Title = ({ title, titleAmharic }) => {
  return (
    <div className="title">
      <div className="row">
        <div className="col-2">
          <img src={EICLogo} alt="EIC logo" width={100} height={100} />
        </div>
        <div className="col-8">
          <h2>{titleAmharic}</h2>
          <h2>{title}</h2>
        </div>
        <div className="col-2">
          <img src={Flag} alt="Flag" width={100} height={100} className="image-circle" />
        </div>
      </div>
    </div>
  );
};

const SubTitle = ({ title, titleAmharic }) => {
  return (
    <div className="title">
      <h3>{titleAmharic}</h3>
      <h3>{title}</h3>
    </div>
  );
};


export default DeedToPrint;
