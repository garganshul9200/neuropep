import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import {
  CheckWhiteIcon,
  RefillIcon,
} from '../../assets/icons';
import { BuilderHeader } from '../../components/builder/BuilderHeader';
import { FormDateField } from '../../components/builder/FormDateField';
import { FormSelectField } from '../../components/builder/FormSelectField';
import { GradientButton } from '../../components/GradientButton';
import { WrapperScreen } from '../../components/WrapperScreen';
import type { RootStackParamList } from '../../navigation/types';
import { colors } from '../../theme';

import {
  CYCLE_PERIOD_OPTIONS,
  DEFAULT_MEDICATION,
  MEDICATION_NAME_OPTIONS,
  SYRINGE_TYPE_OPTIONS,
  type MedicationDraft,
} from './constants';
import { styles } from './styles';

type Props = NativeStackScreenProps<RootStackParamList, 'AddMedicationManual'>;

const VIAL_SWATCHES = [
  colors.primary,
  colors.vialPink,
  colors.vialTeal,
] as const;

function UnitField({
  label,
  unit,
  value,
  onChangeText,
  unitPlacement = 'start',
}: {
  label: string;
  unit: string;
  value: string;
  onChangeText: (value: string) => void;
  unitPlacement?: 'start' | 'end';
}) {
  const unitLabel = <Text style={styles.unitPrefix}>{unit}</Text>;

  return (
    <View style={styles.unitField}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.unitInput}>
        {unitPlacement === 'start' ? unitLabel : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType="numeric"
          style={styles.unitValue}
          placeholderTextColor={colors.textMuted}
        />
        {unitPlacement === 'end' ? unitLabel : null}
      </View>
    </View>
  );
}

export function AddMedicationManualScreen({ navigation, route }: Props) {
  const [draft, setDraft] = useState<MedicationDraft>(
    route.params?.medication ?? DEFAULT_MEDICATION,
  );

  const patch = (partial: Partial<MedicationDraft>) => {
    setDraft(prev => ({ ...prev, ...partial }));
  };

  return (
    <WrapperScreen backgroundColor={colors.background} safeAreaTop>
      <View
        style={styles.screen}
      >
        <BuilderHeader
          title="Add Medication"
          onBack={() => navigation.goBack()}
          containerStyle={styles.header}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.vialCard}>
            <View style={styles.vialVisual}>
              <View style={styles.vialCap} />
              <View style={styles.vialNeck} />
              <View style={styles.vialBody}>
                <View
                  style={[styles.vialFill, { backgroundColor: draft.color }]}
                >
                  <Text style={styles.vialFillLabel}>Half</Text>
                  <Text style={styles.vialFillDose}>
                    {draft.doseAmount}
                    {draft.doseUnit}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.vialMeta}>
              <View style={styles.vialStats}>
                <View style={styles.vialStat}>
                  <Text style={styles.vialStatLabel}>Dose</Text>
                  <Text style={styles.vialStatValue}>
                    {draft.doseAmount} {draft.doseUnit}
                  </Text>
                </View>
                <View style={styles.vialStat}>
                  <Text style={styles.vialStatLabel}>Refill</Text>
                  <RefillIcon
                    width={moderateScale(24)}
                    height={moderateScale(24)}
                  />
                </View>
              </View>

              <View style={styles.colorSection}>
                <Text style={styles.colorLabel}>Select Color</Text>
                <View style={styles.colorRow}>
                  {VIAL_SWATCHES.map(color => {
                    const selected = draft.color === color;
                    return (
                      <Pressable
                        key={color}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        onPress={() => patch({ color })}
                        style={[
                          styles.colorSwatch,
                          { backgroundColor: color },
                        ]}
                      >
                        {selected ? (
                          <CheckWhiteIcon
                            width={moderateScale(22)}
                            height={moderateScale(22)}
                          />
                        ) : null}
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <FormSelectField
              label="Medication name"
              value={draft.name}
              options={MEDICATION_NAME_OPTIONS}
              onChange={name => patch({ name })}
            />
            <FormSelectField
              label="Cycle Period"
              value={draft.cyclePeriod}
              options={CYCLE_PERIOD_OPTIONS}
              onChange={cyclePeriod => patch({ cyclePeriod })}
            />
          </View>

          <View style={styles.card}>
            <UnitField
              label="Dose Amount"
              unit={draft.doseUnit}
              value={draft.doseAmount}
              onChangeText={doseAmount => patch({ doseAmount })}
            />
            <UnitField
              label="BAC Water"
              unit="ml"
              value={draft.bacWater}
              onChangeText={bacWater => patch({ bacWater })}
            />
          </View>

          <View style={styles.card}>
            <UnitField
              label="Concentration"
              unit="mg/ml"
              value={draft.concentration}
              onChangeText={concentration => patch({ concentration })}
            />
            <FormDateField
              label="Start date"
              value={draft.startDate}
              onChange={startDate => patch({ startDate })}
            />
            <UnitField
              label="Unit per dose"
              unit="units"
              unitPlacement="end"
              value={draft.unitPerDose}
              onChangeText={unitPerDose => patch({ unitPerDose })}
            />
            <UnitField
              label="Total dose in vial"
              unit="doses"
              unitPlacement="end"
              value={draft.totalDoses}
              onChangeText={totalDoses => patch({ totalDoses })}
            />
            <UnitField
              label="Vial Available upto"
              unit="days"
              unitPlacement="end"
              value={draft.vialAvailable}
              onChangeText={vialAvailable => patch({ vialAvailable })}
            />
          </View>

          <View style={styles.card}>
            <FormSelectField
              label="Recommended Syringe Type"
              value={draft.syringeType}
              options={SYRINGE_TYPE_OPTIONS}
              onChange={syringeType => patch({ syringeType })}
            />
          </View>

          <GradientButton
            label="Save Medication"
            onPress={() =>
              navigation.navigate('Main', {
                screen: 'Home',
              })
            }
          />
        </ScrollView>
      </View>
    </WrapperScreen>
  );
}
