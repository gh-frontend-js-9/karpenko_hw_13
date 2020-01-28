import {config} from '../../../config';
import {TYPES} from '../../../api_fetcher/index';

export class GetThread{
    constructor(){}
    getThreads(id, sort){
        fetch(`https://${config.domain}/api/threads/messages/${id}?sort=${sort}`, {
            method: TYPES.get,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': config.key
            }
        })
    }
}