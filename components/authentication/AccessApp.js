import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import styles from "./AccessApp.module.css"
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Login from './Login';
import Register from './Register';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={styles.boxContainer}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



const AccessApp = () => {
  const [value, setValue] = useState(0);
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleErrorMessage = (error) => {
    setIsError(true)
    setError(error)
  }

  const errorUi = (
    <div className={styles.error}>{error}</div>
  )

  useEffect(() => {
    if (isError) {

      const error = setTimeout(() => {
        setIsError(false)
      }, 3000)
  
      return () => clearTimeout(error)

    }
  }, [error])


  return (
    <div className={styles.root} >
      {isError && errorUi}
      <AppBar position="static" className={styles.headerColorAndBorders} >
        <Tabs className={styles.headerColorAndBorders} value={value} onChange={handleChange} aria-label="simple tabs">
          <Tab label="Login" {...a11yProps(0)} style={{width: '50%'}} />
          <Tab label="Register" {...a11yProps(1)} style={{width: '50%'}} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0} className={styles.tabContainer}>
        <Login handleErrorMessage={handleErrorMessage} />
      </TabPanel>
      <TabPanel value={value} index={1} className={styles.tabContainer}>
        <Register handleErrorMessage={handleErrorMessage} />
      </TabPanel>
    </div>
  );
}

export default AccessApp