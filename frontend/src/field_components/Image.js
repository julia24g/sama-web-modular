import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader } from '@mui/material';

const Image = forwardRef(
    (
        {
            border = true,
            boxShadow,
            children,
            content = true,
            contentSX = {},
            elevation,
            shadow,
            sx = {},
            title,
            image,
            imageWidth,
            imageHeight,
            ...others
        },
        ref
    ) => {
        const theme = useTheme();
        boxShadow = theme.palette.mode === 'dark' ? boxShadow || true : boxShadow;

        return (
            <Card
                elevation={elevation || 0}
                ref={ref}
                {...others}
                sx={{
                    border: border ? '1px solid' : 'none',
                    borderRadius: 2,
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.divider : theme.palette.grey.A800,
                    boxShadow: boxShadow && (!border || theme.palette.mode === 'dark') ? shadow || theme.customShadows.z1 : 'inherit',
                    ':hover': {
                        boxShadow: boxShadow ? shadow || theme.customShadows.z1 : 'inherit'
                    },
                    ...sx
                }}
            >
                {/* card header */}
                {title && (
                    <CardHeader
                        sx={{
                            p: 2.5,
                            '& .MuiCardHeader-action': { m: '0px auto', alignSelf: 'center' }
                        }}
                        titleTypographyProps={{ variant: 'subtitle1' }}
                        title={title}
                        avatar={
                            <img
                                src={image}
                                alt={title}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    borderRadius: 'inherit'
                                }}
                            />
                        }
                    />
                )}

                {/* card content */}
                {content && <CardContent sx={contentSX}>{children}</CardContent>}
                {!content && children}
            </Card>
        );
    }
);

Image.propTypes = {
    border: PropTypes.bool,
    boxShadow: PropTypes.bool,
    contentSX: PropTypes.object,
    elevation: PropTypes.number,
    shadow: PropTypes.string,
    sx: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    image: PropTypes.string, // Image URL
    content: PropTypes.bool,
    children: PropTypes.node
};

export default Image;
