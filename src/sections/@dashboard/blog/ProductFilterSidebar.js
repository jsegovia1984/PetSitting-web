import PropTypes from 'prop-types';
// @mui
import {
  Box,
  Stack,
  Button,
  Drawer,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// ----------------------------------------------------------------------

export const FILTER_CATEGORIA_OPTIONS = ['Matemática', 'Entrenamiento y Comportamiento', 'Química', 'Historia', 'Geografía', 'Inglés', 'Programación' ];
export const FILTER_TIPOCLASE_OPTIONS = ['Individual', 'Grupal'];
export const FILTER_RATING_OPTIONS = ['up5Star', 'up4Star', 'up3Star', 'up2Star', 'up1Star'];
export const FILTER_FRECUENCIA_OPTIONS = ['Única', 'Semanal', 'Mensual'];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};

export default function ShopFilterSidebar({ openFilter, onOpenFilter, onCloseFilter }) {
  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filtrar&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
        
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filtrar
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>
            <div> 
             
                
              <Typography variant="subtitle1" gutterBottom >
                Categoría
              </Typography>
             
              <FormGroup>
                {FILTER_CATEGORIA_OPTIONS.map((item) => (
                  <FormControlLabel key={item} control={<Checkbox />} label={item} />
                ))}
              </FormGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Tipo de Clase
              </Typography>
              <RadioGroup>
                {FILTER_TIPOCLASE_OPTIONS.map((item) => (
                  <FormControlLabel key={item} value={item} control={<Checkbox />} label={item} />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Frecuencia
              </Typography>
              <RadioGroup>                {FILTER_FRECUENCIA_OPTIONS.map((item) => (
                  <FormControlLabel key={item} value={item} control={<Checkbox />} label={item} />
                ))}
              </RadioGroup>
            </div>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Calificación
              </Typography>
              <RadioGroup>
                
                <Rating/>
                
              </RadioGroup>
            </div>
          </Stack>
        </Scrollbar>

        <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"

            variant="contained"
            startIcon={<Iconify icon="ic:round-clear-all" />}
          >
            Buscar
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
