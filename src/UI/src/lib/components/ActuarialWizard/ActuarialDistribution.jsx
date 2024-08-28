import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Paper,
  Table as MuiTable,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Checkbox
} from '@material-ui/core';
import ActTagChip from './ActTagChip';
import FormHeader from '../gtp/FormHeader';
import StepperButtons from '../gtp/StepperButtons';

const useStyles = makeStyles(theme => ({
  form: {
    maxWidth: theme.spacing(120),
    margin: '0 auto',
    padding: theme.spacing(1, 0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start'
  },
  title: {
    marginBottom: theme.spacing(2.5)
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: theme.spacing(2.5)
  },
  button: {
    margin: theme.spacing(1)
  },
  table: {
    overflowX: 'initial',
    [theme.breakpoints.down('xs')]: {
      overflowX: 'auto'
    }
  },
  tableHeaderCell: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  tableCell: {
    textTransform: 'none',
    fontWeight: 'normal',
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    textAlign: 'center'
  },
  tableContainer: {
    marginTop: theme.spacing(2.5),
    width: '100%'
  }
}));

const Container = ({ withPaper, children }) =>
  withPaper ? <Paper>{children}</Paper> : <div>{children}</div>;

const ActuarialDistribution = ({ actuarial, nextStep, prevStep, formData, setFormData, isUpdate, actProps }) => {
  const classes = useStyles();
  const history = useHistory();
  const [nextButtonTouched, setNextButtonTouched] = useState(false);
  const [checkbox, setCheckBox] = useState({});

  const rtpDistribution = actProps.rtpDistribution || [{}];

  // Extract rtps and moduleIds from rtpDistribution
  const rtps = rtpDistribution.map(item => item.payoutShortName);
  const moduleIds = rtpDistribution.map(item => item.moduleId);

  useEffect(() => {
    const newCheckboxState = {};

    // Preload checkboxes based on clientIds in actuarial.payouts
    if (isUpdate && actuarial?.payouts) {
      actuarial.payouts.forEach(payout => {
        payout.clientIds.forEach(clientId => {
          const name = `${payout.moduleId}_${clientId}`;
          newCheckboxState[name] = true;
        });
      });
    }

    // Preload checkboxes based on rtpSelection in formData
    if (formData?.rtpSelection && Array.isArray(formData.rtpSelection)) {
      formData.rtpSelection.forEach(item => {
        item.clientIds.forEach(clientId => {
          const name = `${item.moduleId}_${clientId}`;
          newCheckboxState[name] = true;
        });
      });
    }

    setCheckBox(newCheckboxState);
  }, [isUpdate, actuarial, formData.rtpSelection]);

  const renderCheckbox = (moduleId, clientId) => {
    if (moduleId === undefined || clientId === undefined) return null;
    const name = `${moduleId}_${clientId}`;
    return (
      <Checkbox
        id={clientId.toString()}
        name={name}
        checked={checkbox[name] || false}
        onChange={event => handleCheckboxChange(event, moduleId, clientId)}
        color="primary"
      />
    );
  };

  const handleCheckboxChange = (event, moduleId, clientId) => {
    const name = `${moduleId}_${clientId}`;
    if (event.target.checked) {
      setCheckBox({ ...checkbox, [name]: event.target.checked });
    } else {
      setCheckBox(prevState => {
        const newState = { ...prevState };
        delete newState[name];
        return newState;
      });
    }
  };

  const updateRtpObject = () => {
    let rtpObject = {};
    Object.keys(checkbox).forEach(key => {
      const [moduleId, clientId] = key.split('_');
      rtpDistribution.forEach((variant, index) => {
        if (variant.moduleId == moduleId) {
          if (rtpObject[index]) {
            rtpObject[index].clientIds.push(clientId);
          } else {
            rtpObject[index] = {
              payoutVariantId: getPayoutVariantId(variant),
              payoutShortName: variant.payoutShortName,
              moduleId: moduleId,
              clientIds: [clientId]
            };
          }
        }
      });
    });
    return rtpObject;
  };

  const getPayoutVariantId = variant => {
    const variantIds = variant.actVariants
      .filter(v => v.payoutVariantId)
      .map(v => v.payoutVariantId);
    return variantIds[0] || null;
  };

  const handleReturn = () => {
    history.push(`/acts/${actProps.actIdRoute}/projects/${actProps.projectId}/dev/actuarials`);
  };

  const validateNextButton = () => {
    return checkbox && Object.keys(checkbox).length > 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!nextButtonTouched) {
      setNextButtonTouched(true);
    }
    const selectedRtps = Object.values(updateRtpObject());
    setFormData({ ...formData, rtpSelection: selectedRtps });
    nextStep();
  };

  const handleBack = e => {
    e.preventDefault();
    const selectedRtps = Object.values(updateRtpObject());
    setFormData({ ...formData, rtpSelection: selectedRtps });
    prevStep();
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.tableContainer}>
        <FormHeader
          variant="h3"
          title="Please select the RTP variants to use in your Actuarial setup:"
        />
        <Container withPaper={true}>
          <MuiTable className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeaderCell}>RTP Variant</TableCell>
                <TableCell className={classes.tableHeaderCell}>Module ID</TableCell>
                <TableCell className={classes.tableHeaderCell}>Mobile Web</TableCell>
                <TableCell className={classes.tableHeaderCell}>Desktop Web</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rtps.map((item, index) => (
                <TableRow key={item + index}>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="body1">
                      <ActTagChip id={item} label={item} isRtp />
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="body1">{moduleIds[index]}</Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="body1">
                      {renderCheckbox(moduleIds[index], 40300)} {/* Mobile Web: clientId 40300 */}
                    </Typography>
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    <Typography variant="body1">
                      {renderCheckbox(moduleIds[index], 50300)} {/* Desktop Web: clientId 50300 */}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </MuiTable>
        </Container>
      </div>

      <div className={classes.buttonGroup}>
        <StepperButtons
          backButtonState={false}
          nextButtonState={false}
          showSubmitButton={false}
          form="variantDetailsForm"
          showNextButton={true}
          backFunc={handleBack}
          nextFunc={handleSubmit}
          showCancelButton
          valid={validateNextButton()}
          cancelFunc={handleReturn}
          showBackButton={true}
        />
      </div>
    </form>
  );
};

export default ActuarialDistribution;
