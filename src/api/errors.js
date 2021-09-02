export default (error) => {
    let responseParsed = {
        status: 500,
        success: false,
        message: 'Server Error',
        errors: {},
    };

    if (!error.response) {
        return responseParsed;
    }

    if (error.response.status === 400) {
        responseParsed = {
            status: error.response.status,
            success: false,
            message: error.response.statusText,
            errors: error.response.data.errors || {},
        };
    }
    if (error.response.status === 401) {
        responseParsed = {
            status: error.response.status,
            success: false,
            message: 'Unauthorized!',
            errors: error.response.data.error || {},
        };
    }
    if (error.response.status === 429) {
        responseParsed = {
            status: error.response.status,
            success: false,
            message: 'Unauthorized!',
            errors: error.response.data.errors || {},
        };
    }
    var _errorServer = error.response;
    console.log({ _errorServer });
    return responseParsed;
};
