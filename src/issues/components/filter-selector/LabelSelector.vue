<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useLabels from '../../composables/useLabels';


const { labelsQuery, toogleLabel, selectedLabels } = useLabels();

</script>
<template>
    <div class="q-mt-md">

        <LoaderSpinner
            v-if="labelsQuery.isFetching.value"
            class="q-mt-md"
            size="50px" 
            :thickness="1"
            :show-text="false"
        />

        <q-chip 
            v-else
            v-for="{ id, name, color } of labelsQuery.data.value"
            :key="id"
            :style="{ color: `#${color}` }"
            :outline=" !selectedLabels.includes(name)" 
            clickable
            @click="toogleLabel(name)"
            >{{ name }}
        </q-chip>

    </div>
</template>
<style scoped></style>