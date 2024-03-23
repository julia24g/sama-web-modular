import React from 'react';
import { LoadingButton } from '@mui/lab';
import Search from '@mui/icons-material/Search';

const SubmitButton = ({ onSubmit, loading, isValid }) => {
    return (
        <>
            <p style={{ fontStyle: "italic" }}>It can take up to 1 min to calculate your results.</p>
            <LoadingButton
                onClick={onSubmit}
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
        </>
    );
}

export default SubmitButton;