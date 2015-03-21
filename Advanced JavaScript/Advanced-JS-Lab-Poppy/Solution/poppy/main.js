poppy.pop('success', 'Success!', 'You have successfully registered.');
poppy.pop('info', 'What to do next...', 'Sign up for hte SoftUni Conf if you haven\'t already!');
poppy.pop('error', 'A fatal error has occurred', 'The server has responded with 404.');
poppy.pop('warning', 'Attention!', 'You are our 100th visitor.', redirect);

function redirect() {
    window.location = 'https://www.youtube.com/watch?v=HMUDVMiITOU';
}

