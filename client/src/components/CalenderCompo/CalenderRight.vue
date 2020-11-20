<template>
    <div class="calender-modal-right">
        <div class="calender-current-year">
            <i class="fas fa-angle-left" v-on:click="prevEvent"></i>
            <span>{{ `${year}.${month}` }}</span>
            <i class="fas fa-angle-right" v-on:click="nextEvent"></i>
        </div>
        <table>
            <th v-for="day in days" v-bind:key="day">{{ day }}</th>
            <tr v-for="(week, parIndex) in weeks" v-bind:key="parIndex">
                <td
                    v-for="(date, index) in week"
                    v-bind:key="index"
                    v-bind:class="[{ sat: date.sat }, { sun: date.sun }, { today: date.today }, { focusDate: date.focus }]"
                    v-on:click="dateClickEvent({ parIndex, index })"
                >
                    {{ date.day }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: ["year", "month", "weeks", "days"],
    methods: {
        prevEvent() {
            this.$emit("prev");
        },
        nextEvent() {
            this.$emit("next");
        },
        dateClickEvent(data) {
            this.$emit("dateClick", data);
        },
    },
};
</script>

<style scope lang="scss">
@import "../styles/calender-right.scss";
</style>
