import namespace from '@/utils/namespace';


export default namespace('global', {
    actions: [
        
    ],
    getters: [
       'processing', 
    ],
    mutations: [
        'startProcessing',
        'stopProcessing',
    ]
});