import axios from 'axios';

function Login() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        try {
            const response = await axios.post('https://genial-backoffice-authentication-bff.homolog.api.genial.systems/api/Users/login', {
                LoginOrEmail: email,
                Password: password
            });
            console.log('Resultado:', response.data);
            const {AccessToken, RefreshToken} = response.data
            window.localStorage.setItem('ac-token', AccessToken)
            window.localStorage.setItem('rf-token', RefreshToken)
            location.replace('/')

        } catch (error) {
            console.error('Erro:', error);
        }
    };

    return (
        <div className="bg-gray-200 flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md w-80">
                <h1 className="text-2xl font-semibold mb-6 text-center">LOGIN</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email/Username:</label>
                        <input type="text" id="email" name="email" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Digite seu email ou username" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Senha:</label>
                        <input type="password" id="password" name="password" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Digite sua senha" />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Entrar</button>
                </form>
            </div>
        </div>
    );
}

// Exportando o componente
export default Login;
