import {
    JsonHubProtocol,
    HttpTransportType,
	HubConnectionBuilder,
    LogLevel
  } from '@aspnet/signalr'
  
import { AUTH_LOGIN } from '../admin/modules/auth/store/action-types';
import { setLocale, updateConnectionStatus } from '../admin/modules/auth/store/actions';
  

  
const onReceive = (store, res) => {
	store.dispatch(setLocale('en'))
    console.log('****** NOTIFICATION ******', res);	
};


const startSignalRConnection = (store, connection) => connection.start()
    .then(() => {
		store.dispatch(updateConnectionStatus(true))
		console.info('SignalR Connected')
	})
    .catch(err => {
		store.dispatch(updateConnectionStatus(false))
		console.error('SignalR Connection Error: ', err)
	});
  
const signalRMiddleware = store => next => async (action) => {
    // register signalR after the user logged in
    if (action.type === AUTH_LOGIN) {
    	const connectionHub = 'http://192.168.60.202/ServerHub/chatHub';
  
		const protocol = new JsonHubProtocol();
  
		// let transport to fall back to to LongPolling if it needs to
		const transport = HttpTransportType.WebSockets | HttpTransportType.LongPolling;
  
		const options = {
			transport,
			logMessageContent: true,
			logger: LogLevel.Trace,
			accessTokenFactory: () => action.payload
		};
  
		// create the connection instance
		const connection = new HubConnectionBuilder()
			.withUrl(connectionHub, options)
			.withHubProtocol(protocol)
			.build();
  
		// event handlers, you can use these to dispatch actions to update your Redux store
		connection.on('ReceiveMessage', onReceive);
		connection.on('SendMessage', onReceive);
  
		// re-establish the connection if connection dropped
		connection.onclose(() => setTimeout(startSignalRConnection(connection), 5000));
  
		startSignalRConnection(store, connection);
    }
  
    return next(action);
};
  
export default signalRMiddleware;