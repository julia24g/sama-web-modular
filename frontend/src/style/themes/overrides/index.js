// third-party
import { merge } from 'lodash';

// project import
import CardContent from './CardContent';
import IconButton from './IconButton';
import InputLabel from './InputLabel';
import LinearProgress from './LinearProgress';
import Link from './Link';
import ListItemIcon from './ListItemIcon';
import OutlinedInput from './OutlinedInput';
import Typography from './Typography';

// ==============================|| OVERRIDES - MAIN ||============================== //

export default function ComponentsOverrides(theme) {
  return merge(
    CardContent(),
    IconButton(theme),
    InputLabel(theme),
    LinearProgress(),
    Link(),
    ListItemIcon(),
    OutlinedInput(theme),
    Typography()
  );
}
