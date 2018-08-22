import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import PolygonIcon from './polygonIcon';
import SaveEntryModal from './SaveEntryModal';

const CREATE_POLYGON = gql`
   mutation CreatePolygon($name: String!,  $geojson: JSON!, $owner: String!) {
    createPolygonByJson(input: {name: $name, geojson: $geojson, owner: $owner}) {
      polygon{
        id
        name
        geomJson
        owner
      }
    }
  }
`;

const FeatureList = withTheme()(({ features, selected, polygons, toggleSelect, clearSelected, theme, user, styles, optimisticSaveFeature, saveModalOpen }) => {

  // remove optimistic saved feature (if any) from features
  let unsavedFeatures = [];
  features.forEach((feature) => {
    if (!feature.saved) {
      unsavedFeatures.push(feature);
    }
  });

  return (
    <div>
      {features && unsavedFeatures.length ?
        <List>
          <Typography variant="title" style={{fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, margin: "25px"}}>
            {"New Plots"}
          </Typography>
          {unsavedFeatures.map((feature) =>
            <FeatureListItem
              item={feature}
              theme={theme}
              selected={selected[feature.id]}
              user={user}
              styles={styles}
              optimisticSaveFeature={optimisticSaveFeature}
              clearSelected={clearSelected}
              saveModalOpen={saveModalOpen}
              toggleSelectThis={() => {
                toggleSelect(feature.id);
              }}
            />
          )}
        </List>
        : ""
      }
      {polygons && polygons.length ?
        <List>
          <Typography variant="title" style={{fontFamily: styles.title.fontFamily, fontSize: styles.title.fontSize, margin: "25px"}}>
            {"Saved Plots"}
          </Typography>
          {polygons && polygons.map((polygon) =>
            <SavedFeatureItem item={polygon} theme={theme} selected={selected[polygon.id]} styles={styles}
              toggleSelectThis={() => {
                toggleSelect(polygon.id);
              }}
            />
          )}
        </List>
        : ""
      }
    </div>
  );
});

const SavedFeatureItem = ({ item, selected, toggleSelectThis, theme, styles }) => {
  const style = selected ? {backgroundColor: theme.palette.primary.main} : {};
  return (
	  <ListItem dense button style={style} key={item.id} onClick={toggleSelectThis}>
      <PolygonIcon polygon={item}/>
      <ListItemText
        disableTypography
        primary={<Typography style={{fontSize: styles.fontSize}}>{item.name}</Typography>} />
    </ListItem>
  );
}

const FeatureListItem = ({ item, selected, toggleSelectThis, theme, user, styles, optimisticSaveFeature, clearSelected, saveModalOpen }) => {
  const style = selected ? {backgroundColor: theme.palette.primary.main} : {};

  return (
    <Mutation mutation={CREATE_POLYGON}>
      {( createPolygonByJson, {data}) => (
	       <ListItem dense button style={style} key={item.id} onClick={toggleSelectThis}>
            <PolygonIcon polygon={item.geometry}/>
            <ListItemText
              disableTypography
              primary={<Typography style={{fontSize: styles.fontSize}}>{"Unsaved Plot"}</Typography>} />
            <Button style={{color: styles.primaryColor.color}}
              onClick={(e) => {
                e.stopPropagation();
                saveModalOpen();
                // createPolygonByJson({variables: {name: "foobar" , geojson: item.geometry, owner: user }});
                // optimisticSaveFeature(item.id);
                // clearSelected(item.id); // delete from map
              }}>
              Save
            </Button>
            <SaveEntryModal open={saveModalOpen} onClose={() => {}} polygon={item} />
          </ListItem>
        )
      }
    </Mutation>
  );
}

export default FeatureList;
