
// styles/globalStyles.ts
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#c75546ff',
  },
  stopContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#851608ff',
  },
  dropContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#500900ff',
  },
  rollContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#6d0f03ff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffece2ff',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#420000ff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#8a0000ff',
    marginBottom: 20,
  },
  status: {
    fontSize: 24,
    color: '#ccc',
    marginBottom: 30,
  },
  debugInfo: {
    marginTop: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#2a2a3e',
    borderRadius: 10,
    width: '100%',
  },
  debugText: {
    fontSize: 12,
    color: '#aaa',
    marginVertical: 2,
    fontFamily: 'monospace',
  },
  buttonSecondary: {
    backgroundColor: '#666',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonTextSmall: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: 20,
    color: '#FFA500',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 20,
    color: '#FF5555',
    marginBottom: 10,
  },
  successText: {
    fontSize: 20,
    color: '#4CAF50',
    marginBottom: 10,
  },
  loadingText: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 50,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 24,
    color: '#ccc',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#888',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  row: {
    backgroundColor: '#2a2a3e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  topThree: {
    borderColor: '#4CAF50',
  },
  firstPlace: {
    backgroundColor: '#2d3a2d',
    borderColor: '#FFD700',
    borderWidth: 3,
  },
  rankContainer: {
    width: 50,
    alignItems: 'center',
  },
  rank: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: 'bold',
  },
  medalRank: {
    fontSize: 24,
  },
  timesContainer: {
    flex: 1,
    marginHorizontal: 70,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  timeLabel: {
    fontSize: 14,
    color: '#aaa',
  },
  timeValue: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'monospace',
  },
  totalRow: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  totalLabel: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: 11,
    color: '#888',
  },
  timeText: {
    fontSize: 10,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 10,
  },
  backButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#FF5555',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
    helpButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
    helpText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

// You can also export color constants
export const colors = {
  background: '#1e1e2f',
  backgroundLight: '#2a2a3e',
  primary: '#4CAF50',
  secondary: '#666',
  text: '#fff',
  textMuted: '#ccc',
  textDark: '#aaa',
  warning: '#FFA500',
  error: '#FF5555',
  success: '#4CAF50',
};

// Export common spacing values
export const spacing = {
  xs: 5,
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

// Export font sizes
export const fontSizes = {
  small: 12,
  medium: 16,
  large: 20,
  xlarge: 24,
  xxlarge: 48,
  huge: 72,
};