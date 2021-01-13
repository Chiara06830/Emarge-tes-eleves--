import { Dimensions } from 'react-native';

export default {
    container: {
        marginTop: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    container2: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20
    },
    container3: {
        justifyContent: "center",
        alignItems: "center"
    },
    container4: {
        marginRight: 20,
        marginLeft: 20
    },
    container5:{
        justifyContent: "center",
        alignItems: "center",
        margin: 5
    },
    containerViewRow: { 
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginBottom: 20
    },
    title: {
        fontSize: 20,
        marginBottom: 20
    },
    title2: {
        fontSize: 18,
        marginBottom: 20
    },
    texte: {
        fontSize: 14,
        justifyContent: 'flex-start',
        alignItems: "flex-start"
    },
    texte2: {
        fontSize: 14,
        justifyContent: 'flex-end',
        alignItems: "flex-end"
    },
    lien: {
        fontSize: 15,
        color: 'black',
        marginBottom : 5,
        textDecorationLines : "underline"
    },
    input: {
        margin: 10,
        borderColor: 'gray', 
        borderWidth: 1, 
        padding : 5,
        backgroundColor : 'white'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 30,
        margin: 2,
        borderColor: '#2a4944',
        borderWidth: 1,
        backgroundColor: '#d2f7f1'
    },
    row: {
        backgroundColor: '#ffffff',
        padding: 5,
        margin : 2,
        flex: 1,
        width: Dimensions.get('window').width
    },
    textArea: {
        borderColor: 'gray', 
        borderWidth: 1
    },
    decalerDroite: {
        marginRight: 20
    },
    buttonColor : '#3a3a3a'
}