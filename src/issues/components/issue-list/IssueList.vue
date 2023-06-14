<script setup lang="ts">
import IssueCard from './IssueCard.vue';
import { Issue } from '../../interfaces/issue';

interface Props {
    issues: Issue[];
}

const props = defineProps<Props>();


</script>
<template>
    <div class="row">
        <IssueCard 
            v-for="issue of props.issues"
            :issue="issue"
            :key="issue.id"
        />
    </div>
</template>
<style scoped></style>