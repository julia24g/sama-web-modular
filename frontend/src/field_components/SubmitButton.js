import React from 'react';
import { LoadingButton } from '@mui/lab';
import Search from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';

const SubmitButton = ({ loading, isValid }) => {
    return (
        <Tooltip title={isValid ? "" : "Please fill in all required fields"} placement="bottom">
            <span>
                <LoadingButton
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<Search />}
                    variant="contained"
                    type="submit"
                    style={{ margin: '10px' }}
                    sx={{ backgroundColor: "#4F2683", color: "white", fontWeight: "600" }}
                    disabled={!isValid || loading}
                >
                    Submit
                </LoadingButton>
            </span>
        </Tooltip>
    );
}

export default SubmitButton;