<template>
	<v-layout row justify-center>
		<v-dialog
			v-model="detailsDialog"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition"
		>
			<v-card>
				<v-toolbar dark color="dark">
					<v-btn icon dark @click="detailsDialog = false">
						<v-icon>close</v-icon>
					</v-btn>
					<v-toolbar-title>Planet Details</v-toolbar-title>
					<v-spacer></v-spacer>
				</v-toolbar>

				<div>
					<v-layout row>
						<v-flex>
					<sub-details :subDetails="detailsData" />
						</v-flex>
						<v-flex>
					<residents :people="detailsData.residents" />
						</v-flex>
					</v-layout>
				</div>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
import SubDetails from './Sub-Details';
import Residents from './Residents';

export default {
  name: 'Details',
  data() {
    return {
      detailsDialog: false,
      notifications: false,
      sound: true,
      widgets: false
    }
  },
  methods: {
    toggleDialog() {
      this.detailsDialog = true;
    }
  },
  props: ['detailsData'],
  components: { SubDetails, Residents }
};
</script>

