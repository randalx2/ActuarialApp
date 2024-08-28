import React, { useEffect, useState, useContext } from 'react'
import ActuarialsList from '../components/ActuarialsList'
import DeleteActuarial from './DeleteActuarial'
import ActuarialDetails from './ActuarialDetails'
import { ActContext } from '../index'
//import useABTestingApi from '../hooks/api/useABTestingApi'

//For mock purposes
import actuarialsData from '../mocks/actuarials.json'

function Actuarials() {
  const actProps = useContext(ActContext)
  const [actuarials, setActuarials] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [selectedActuarial, setSelectedActuarial] = useState(null)

  // const api = useABTestingApi()

  // useEffect(() => {
  //   async function fetchActuarials() {
  //     if (!actProps) {
  //       return
  //     }

  //     try {
  //       const response = await api.getApi(
  //         `/Actuarials/${actProps.actId}/${actProps.projectId}`
  //       )()
  //       const data = response.data
  //       setActuarials(data)
  //     } catch (error) {
  //       if (error.response && error.response.status === 404) {
  //         setActuarials([])
  //       } else {
  //         console.error('Error fetching Actuarials:', error)
  //         setErrorMessage(
  //           'An error occurred while fetching the Actuarials. Please try again later.'
  //         )
  //       }
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchActuarials()
  // }, [actProps, api])

  useEffect(() => {
    // Simulate fetching Actuarials from the mock JSON file
    // The JSON Dictates the layout of the home page and sets default values for the Update Wizard
    if (actProps) {
      // Add any additional filtering based on actProps here if necessary
      setActuarials(actuarialsData);
    } else {
      setActuarials([]);
    }
    setLoading(false);
  }, [actProps]);

  const handleDelete = actuarial => {
    setSelectedActuarial(actuarial)
    setShowDeleteModal(true)
  }

  const handleDetails = actuarial => {
    setSelectedActuarial(actuarial)
    setShowDetailsModal(true)
  }

  const closeModal = () => {
    setShowDeleteModal(false)
    setShowDetailsModal(false)
  }

  if (loading) {
    return <div>Loading Actuarial Data...</div>
  }

  if (errorMessage) {
    return <div data-testid="error-message">{errorMessage}</div>
  }

  return (
    <main>
      {actuarials && (
        <ActuarialsList
          //api={api}
          actProps={actProps}
          actuarials={actuarials}
          onDelete={handleDelete}
          onDetails={handleDetails}
        />
      )}

      {showDeleteModal && (
        <DeleteActuarial 
        //api={api} 
        actuarial={selectedActuarial} 
        onClose={closeModal} 
        />
      )}

      {showDetailsModal && (
        <ActuarialDetails actuarial={selectedActuarial} onClose={closeModal} />
      )}
    </main>
  )
}

export default Actuarials
