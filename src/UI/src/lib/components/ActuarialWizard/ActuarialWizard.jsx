import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import HorizontalStepper from './HorizontalStepper';
import ActuarialDetails from './ActuarialDetails';
import VariantDetails from './VariantDetails';
import Review from './Review';
import ActuarialDistribution from './ActuarialDistribution';

const ActuarialWizard = ({ closeModal, isUpdate, actuarial, actProps }) => {
  // Check if actProps is populated
  const isActPropsPopulated =
    Object.keys(actProps).length !== 0 &&
    Object.values(actProps).every(prop => prop !== null && prop !== undefined);

  // Initialize state hooks
  const [step, setStep] = useState(0);
  const [isVariantsModified, setVariantsModified] = useState(false);
  const [formData, setFormData] = useState({
    ...actProps,
    actuarialLabel: '',
    actuarialDescription: '',
    startDateTimeUtc: new Date().toISOString(),
    endDateTimeUtc: new Date().toISOString(),
    actuarialType: '',
    variantRequestModels: [],
    rtpSelection: [],
  });

  // Update formData based on whether it's an update or creation
  useEffect(() => {
    if (isUpdate && actuarial) {
      setFormData(prevFormData => ({
        ...prevFormData,
        actuarialLabel: actuarial.label || '',
        actuarialDescription: actuarial.description || '',
        startDateTimeUtc: actuarial.startDateTimeUtc || new Date().toISOString(),
        endDateTimeUtc: actuarial.endDateTimeUtc || new Date().toISOString(),
        actuarialType: actuarial.actuarialType || '',
        variantRequestModels: actuarial.variants || [],
        rtpSelection: actuarial.payouts || [],
      }));
    }
  }, [isUpdate, actuarial]);

  // Update the step state based on conditions after initialization
  useEffect(() => {
    if ((isUpdate && actuarial) || (!isUpdate && isActPropsPopulated)) {
      setStep(1);
    }
  }, [isUpdate, actuarial, isActPropsPopulated]);

  const nextStep = () => {
    setStep(prevStep => prevStep + 1);
  };

  const prevStep = () => {
    setStep(prevStep => prevStep - 1);
  };

  const stepTitles = [
    'Actuarial details',
    'Treatment details',
    'Actuarial RTP Distribution',
    'Review',
  ];

  if (!isActPropsPopulated) {
    return <CircularProgress />; // Loading spinner from Material UI
  }

  return (
    <>
      {(isUpdate || isActPropsPopulated) && step >= 0 && (
        <HorizontalStepper activeStep={step - 1} stepTitles={stepTitles} />
      )}
      {step === 1 && (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ActuarialDetails
            nextStep={nextStep}
            prevStep={prevStep}
            formData={formData}
            setFormData={setFormData}
            isUpdate={isUpdate}
            actuarial={actuarial}
            actProps={actProps}
          />
        </MuiPickersUtilsProvider>
      )}
      {step === 2 && (
        <VariantDetails
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
          isUpdate={isUpdate}
          actuarial={actuarial}
          isVariantsModified={isVariantsModified}
          setVariantsModified={setVariantsModified}
          actProps={actProps}
        />
      )}
      {step === 3 && (
        <ActuarialDistribution
          nextStep={nextStep}
          prevStep={prevStep}
          formData={formData}
          setFormData={setFormData}
          isUpdate={isUpdate}
          actuarial={actuarial}
          isVariantsModified={isVariantsModified}
          setVariantsModified={setVariantsModified}
          actProps={actProps}
        />
      )}
      {step === 4 && (
        <Review
          prevStep={prevStep}
          formData={formData}
          closeModal={closeModal}
          isUpdate={isUpdate}
          actuarial={actuarial}
          actProps={actProps}
        />
      )}
    </>
  );
};

export default ActuarialWizard;
