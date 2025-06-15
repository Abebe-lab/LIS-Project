//TODO: format using mui and use aspect ratio from image
import React from "react";
import { Flag, EICLogo } from "../../../../assets/image/print";
import "./PrintDeed.css";
import { Container, Grid } from "@mui/material";
import CoordinateTable from "./CoordinateTable";
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';


const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    width: '100%',
  },
  title: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  legend: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  legendIcon: {
    width: '20px',
    height: '20px',
    marginRight: '0.5rem',
  },
  coordinate: {
    fontSize: '0.8rem',
    marginBottom: '1rem',
  },
  siteLocation: {
    width: '50%',
    height: '200px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  plotArea: {
    width: '50%',
    height: '200px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  plotAreaContainer: {
    position: 'relative',
  },
  plotAreaShape: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '150px',
    height: '100px',
    border: '2px solid #000',
  },
  dimension: {
    position: 'absolute',
    fontSize: '0.8rem',
  },
});
//prettier-ignore
const IPDCPlanComponent = React.forwardRef(({ data }, ref) => {
  const classes = useStyles();

  //const { selectedPark, selectedParcel, investorName } = dataToPrint;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box className={classes.root}>
          <Typography variant="h6" className={classes.title}>
            {data.name}
          </Typography>
          <Typography variant="body1">
            Location: {data.location}
          </Typography>
          <Typography variant="body1">
            Region: {data.region}
          </Typography>
          <Typography variant="body1">
            Area: {data.area}
          </Typography>
          <Typography variant="body1" className={classes.coordinate}>
            Coordinate:
          </Typography>
          <ul>
            {data.coordinates.map((coordinate, index) => (
              <li key={index}>{coordinate}</li>
            ))}
          </ul>
          <div className={classes.legend}>
            <div className={classes.legendIcon} style={{ backgroundColor: 'blue' }} />
            <Typography variant="body1">Yasbin Trading</Typography>
          </div>
          <div className={classes.siteLocation}>
            {/* Placeholder for site location map */}
            <Typography variant="body1">Site Location Map</Typography>
          </div>
          <div className={classes.plotAreaContainer}>
            <div className={classes.plotArea}>
              {/* Placeholder for plot area */}
              <Typography variant="body1">Plot Area</Typography>
              <div className={classes.plotAreaShape} />
              <Typography
                variant="body1"
                className={classes.dimension}
                style={{ top: '20%', left: '5%' }}
              >
                115m
              </Typography>
              <Typography
                variant="body1"
                className={classes.dimension}
                style={{ top: '50%', left: '10%' }}
              >
                118m
              </Typography>
              <Typography
                variant="body1"
                className={classes.dimension}
                style={{ top: '80%', left: '5%' }}
              >
                133m
              </Typography>
              {/* Add more dimensions as needed */}
            </div>
          </div>
        </Box>
      </Grid>
    </Grid>
  );
});
/*
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

const Tbl = ({ children }) => {
  return <div className="table">{children}</div>;
};

const Cell = ({ content }) => {
  return <div className="cell">{content}</div>;
};

export default IPDCPlanComponent;
    <div ref={ref} className="print">
    
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
            {<CoordinateTable coordinates={coordinates} />}
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
    </div>*/