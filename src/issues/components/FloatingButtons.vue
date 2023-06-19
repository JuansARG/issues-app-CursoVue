<script setup lang="ts">
import { toRef } from 'vue';


interface FabButton {
    icon: string;
    color?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    action: () => void;
};

interface Props {
    buttons: FabButton[];
};

const props = defineProps<Props>();
const { value: buttons } = toRef(props, 'buttons');


</script>
<template>
    <div class="fab">
        <q-btn class="q-mr-md"
            v-for="{ action, color, icon, size } in buttons"
            :key="icon"
            :color="color || 'primary'" 
            :icon="icon" 
            :size="size || 'lg'"
            @click="action"
            round />
    </div>
</template>
<style scoped>
.fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
}
</style>