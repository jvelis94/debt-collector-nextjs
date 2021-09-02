import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PersonalBill from './PersonalBill';

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
        <Box p={0}>
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs style={{backgroundColor: "#2999D4"}} value={value} onChange={handleChange} aria-label="simple tabs example">
            {props.people.map(person => (
                <Tab key={person.id-1} label={person.name} {...a11yProps(person.id-1)} />
            ))}
        </Tabs>
      </AppBar>
      {props.people.map(person => (
            <TabPanel value={value} index={person.id-1} key={person.id-1}>
                <PersonalBill 
                    key={person.id-1} 
                    person={person} 
                    addItemToPerson={props.addItemToPerson}
                    incrementItemQuantity={props.incrementItemQuantity}
                    decrementItemQuantity={props.decrementItemQuantity}
                    removeItemFromPerson={props.removeItemFromPerson}
                    eliminateTax={props.eliminateTax}
                    addTax={props.addTax}
                />
            </TabPanel>
        ))}
    </div>
  );
}