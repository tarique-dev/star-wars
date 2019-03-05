<template>
	<v-app id="inspire" dark>
		<v-toolbar app fixed>
			<v-toolbar-title>Star Wars</v-toolbar-title>
		</v-toolbar>
		<v-content>
			<v-container fluid>
				<v-layout justify-center align-center >
					<v-flex shrink v-if="!loadDialog">
						<vue-good-table
							:columns="columns"
							:rows="rows"
							:line-numbers="true"
							@on-row-click="onRowClick"
							:sort-options="{
								enabled: true,
								initialSortBy: 'sortOptions'
							}"
						/>
							<v-layout align-center justify-space-around row fill-height>
							<v-btn
								color="orange darken-2"
								:disabled="!prevPageUrl"
								dark
								@click="getPrevPlanets"
							>
								<v-icon dark left>arrow_back</v-icon>Previous
							</v-btn>
							<v-btn
								color="orange darken-2"
								:disabled="!nextPageUrl"
								dark
								@click="getNextPlanets"
							>
								<v-icon dark left>arrow_forward</v-icon>Next
							</v-btn>
						</v-layout>
					</v-flex>
				</v-layout>
				<v-dialog v-model="loadDialog" hide-overlay persistent width="300">
							<v-card color="dark" dark>
								<v-card-text
									>Loading
									<v-progress-linear
										indeterminate
										color="white"
										class="mb-0"
									></v-progress-linear>
								</v-card-text>
							</v-card>
						</v-dialog>
				<Details :detailsData="selectedPlanet" ref="planetDetails" />
			</v-container>
		</v-content>
		<v-footer app fixed>
			<span>&copy; 2019</span>
		</v-footer>
	</v-app>
</template>

<script>
import { VueGoodTable } from 'vue-good-table';
import Details from './Planet-Details';
import baseURL from '../constants/endpoints';
import axios from 'axios';

export default {
  data: () => ({
    drawer: null,
    sortOptions: [
      { field: 'name', type: 'asc' },
      { field: 'population', type: 'asc' }
    ],
    loadDialog: true,
    columns: [
      {
        label: 'Planet Name',
        field: 'name',
        type: 'string',
        filterOptions: {
          enabled: true
        }
      },
      {
        label: 'Population',
        field: 'population',
        type: 'number',
      },
      {
        label: 'Terrain Type',
        field: 'terrain',
        type: 'string'
      }
    ],
    rows: [],
    nextPageUrl: null,
    prevPageUrl: null,
    selectedPlanet: null
  }),
  props: {
    source: String
  },
  components: {
    VueGoodTable,
    Details
  },
  mounted() {
	  //fetch first 10 planet details in page load
    axios
      .get(baseURL)
      .then(response => {
        this.rows = response.data.results;
        this.nextPageUrl = response.data.next;
        this.loadDialog = false;
	  })
	  .catch(err=>console.log(error));;
  },
  methods: {
    getPlanets(url) { // this method fetches planet details when next or prev button is clicked
      this.loadDialog = true;
      axios
        .get(url)
        .then(response => {
          this.rows = response.data.results;
          this.nextPageUrl = response.data.next;
          this.prevPageUrl = response.data.previous;
          this.loadDialog = false;
        });
    },
    getNextPlanets() {
      this.getPlanets(this.nextPageUrl);
    },
    getPrevPlanets() {
      this.getPlanets(this.prevPageUrl);
    },
    onRowClick(params) {
      this.selectedPlanet = params.row;
      this.$refs.planetDetails.toggleDialog();
    }
  }
};
</script>

<style>
#inspire {
	background-image: url('../assets/star-wars.jpg');
}
</style>
