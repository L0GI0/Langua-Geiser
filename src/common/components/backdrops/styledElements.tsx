import { Backdrop } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import { Typography  } from "material-ui-core";
import styled from 'styled-components'

// ----------------------------------------------------------------------

export const LimitedBackdrop = styled(Backdrop)`
  &.MuiBackdrop-root {
    position: absolute;
    z-index: 1;
    background: none;
  }
`

export const BorderFlexLimitedBackdrop = styled(LimitedBackdrop)`
  &.MuiBackdrop-root {
    display: flex;
    flex-direction: column;
  }
`

export const ResultHeader = styled(Typography).attrs({variant: 'h5'})`  
  &.MuiTypography-root {
    margin: 1.75rem 0 .75rem 0;
  }
`

export const SuccessIcon = styled(CheckCircleIcon)`
    &.MuiSvgIcon-root {
        font-size: 5em;
    }
    color: ${props => props.theme.palette.success.main};
`

export const InformationIcon = styled(InfoIcon)`
  &.MuiSvgIcon-root {
    font-size: 5em;
  }

  color:  ${props => props.theme.palette.info.main}
`

export const AppWarningIcon = styled(WarningIcon)`
  &.MuiSvgIcon-root {
    font-size: 5em;
  }

  color: ${props => props.theme.palette.warning.main}
`

export const ErrorIcon = styled(ReportIcon)`
  &.MuiSvgIcon-root {
    font-size: 5em;
  }

  color: ${props => props.theme.palette.error.main}
`