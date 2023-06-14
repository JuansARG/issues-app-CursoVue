import { computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { githubApi } from '../../api/githubApi';
import { Issue } from '../interfaces/issue';
import { Comment } from '../interfaces/comment';

const getIssueById = async( issueNumber: number ): Promise<Issue> => {
    const { data } = await githubApi.get<Issue>(`/issues/${ issueNumber }`);
    return data;
};

const getComments = async( issueNumber: number ): Promise<Comment[]> => {
    const { data } = await githubApi.get<Comment[]>(`/issues/${issueNumber}/comments`);
    return data;
};

const useIssue = ( issueNumber: number ) => {

    const issueQuery = useQuery(
        ['issue', issueNumber],
        () => getIssueById(issueNumber),
        {
            staleTime: 1000 * 60
        }
    );

    const commentsQuery = useQuery(
        ['issue', issueNumber, 'comments'],
        () => getComments( issueNumber ),
        // () => getComments(issueQuery.data.value?.number || 0),
        {
            staleTime: 1000 * 30,
            // enabled: computed(() => !!issueQuery.data.value)
        }
    );


    return {
        issueQuery,
        commentsQuery
    }
 }

 export default useIssue;