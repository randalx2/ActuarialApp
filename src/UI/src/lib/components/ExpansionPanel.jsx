import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MuiAccordion from '@material-ui/core/Accordion'
import MuiAccordionSummary from '@material-ui/core/AccordionSummary'
import MuiAccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing(2)
  }
})

const ExpansionPanel = withStyles({
  root: {
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion)

const ExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 56,
    borderBottom: '1px solid rgba(0, 0, 0, 0)',
    '&$expanded': {
      minHeight: 56,
      borderBottom: '1px solid rgba(0, 0, 0, .125)'
    }
  },
  content: {
    margin: 0,
    '&$expanded': {
      margin: 0
    }
  },
  expanded: {}
})(MuiAccordionSummary)

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: 'block'
  }
}))(MuiAccordionDetails)

class ExpansionPanelComponent extends React.PureComponent {
  render() {
    const {
      classes,
      onChange,
      expanded,
      hideExpandIcon,
      defaultExpanded,
      summaryComponent,
      detailsComponent,
      disableExpansion,
      groupId,
      removeBoxShadow = false
    } = this.props

    return (
      <div className={classes.root}>
        <ExpansionPanel
          style={removeBoxShadow ? { border: '0.5px solid #00000017', boxShadow: 'none' } : null}
          cy-data={groupId}
          elevation={1}
          expanded={expanded && !disableExpansion}
          defaultExpanded={defaultExpanded}
          onChange={onChange}>
          <ExpansionPanelSummary
            expandIcon={
              hideExpandIcon ? null : (
                <ExpandMoreIcon color={disableExpansion ? 'disabled' : 'primary'} />
              )
            }>
            {summaryComponent}
          </ExpansionPanelSummary>
          {!disableExpansion && <ExpansionPanelDetails>{detailsComponent}</ExpansionPanelDetails>}
        </ExpansionPanel>
      </div>
    )
  }
}

export default withStyles(styles)(ExpansionPanelComponent)
