import React from 'react'
import { withRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import App from './App'
import payoutVariantObject from './components/gtp/payoutVariantObject'

const localQueryClient = new QueryClient()

// Enables global access to actProps
// For dev testing
export const ActContext = React.createContext()

function ActuarialSetup({ actProps, queryClient, ...props }) {
  // Ensure actProps is defined
  actProps = actProps || {
    actId: 2,
    actIdRoute: '2-actuarialDataTest',
    actName: 'Actuarial Data Test V96',
    projectId: 9,
    projectName: 'Actuarial Data NoExpTest',
    isProjectInDevelopment: true,
    name: 'Praneel Misthry',
    email: 'praneel.misthry@actsglobal.com',
    rtpDistribution: payoutVariantObject
  }

  return (
      <QueryClientProvider client={queryClient ?? localQueryClient}>
        <ActContext.Provider value={actProps}>
          <App {...props} />
        </ActContext.Provider>
        {!queryClient && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
  )
}

export default withRouter(ActuarialSetup)
