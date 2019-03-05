<template>
	<v-flex xs12 v-if="hasResidents">
		<v-card>
			<v-list>
				<v-subheader>Residents</v-subheader>
				<div class="text-xs-center" v-if="dataLoaded">
					<v-progress-circular
						indeterminate
						color="purple"
					></v-progress-circular>
				</div>
				<v-list-tile v-for="item in items" :key="item.name" avatar>
					<v-list-tile-action>
						<v-icon v-if="item.name" color="purple">mood</v-icon>
					</v-list-tile-action>

					<v-list-tile-content>
						<v-list-tile-title v-text="item.name"></v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</v-list>
		</v-card>
	</v-flex>
</template>

<script>
import axios from 'axios';
import { Promise } from 'q';
export default {
  name: 'Residents',
  props: ['people'],
  data() {
    return {
      items: [],
      hasResidents: false,
      dataLoaded: false
    }
  },
  mounted() {
    this.getResidentDetails();
  },
  watch: {
    people: function () {
      this.getResidentDetails();
    }
  },
  methods: {
    getResidentDetails() {
      this.dataLoaded = true;
      this.items = [];
      const residentLen = this.people.length;
      if (!residentLen) {
        this.hasResidents = false;
        return false;
      }
      this.hasResidents = true;
      const promiseArr = this.people.map((item, index) => new Promise((resolve, reject) => {
        axios
          .get(this.people[index])
          .then(response => {
            resolve(response);
          })
          .catch(err => reject(err));
      }));
      Promise.all(promiseArr).then(res => {
        this.dataLoaded = false;
        this.items = res.map(item => ({ name: item.data.name }));
      })
    }
  }
}
</script>

